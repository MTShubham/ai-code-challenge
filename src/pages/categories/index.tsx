import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Container, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from 'axios';
import styles from './category.module.css';

interface Category {
  id: string;
  name: string;
}

interface CategoryPageProps {
  initialCategories: Category[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ initialCategories }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log({ categories })

  const toggleModal = () => setModal(!modal);

  const handleAddCategory = async () => {
    console.log({ newCategory })
    try {
      const response = await fetch('http://192.168.3.122:8081/v1/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory }),
      });
      if (response.ok) {
        const data = await response.json();
        setCategories([...categories, data]);
        setNewCategory('');
      } else {
        setError('Failed to add category');
      }
    } catch (error) {
      setError('Failed to add category');
    }
  };

  const handleEditCategory = async () => {
    if (selectedCategory) {
      try {
        const response = await axios.patch(`/api/categories/${selectedCategory?.id}`, { name: selectedCategory?.name });
        setCategories(categories?.map(cat => (cat?.id === selectedCategory?.id ? response?.data : cat)));
        setSelectedCategory(null);
        toggleModal();
      } catch (error) {
        setError('Failed to edit category');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'newCategory') {
      setNewCategory(value);
    } else if (selectedCategory) {
      setSelectedCategory({ ...selectedCategory, [name]: value });
    }
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    toggleModal();
  };

  return (
    <Container>
      <h3 className={styles.heading}>Categories</h3>

      {error && <Alert color="danger">{error}</Alert>}

      <Row>
        <Col md="8">
          <Table striped responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category?.id}>
                  <td>{category?.name}</td>
                  <td>
                    <Button color="warning" onClick={() => handleEditClick(category)}>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md="1"></Col>
        <Col md="3">
          <Form inline onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }}>
            <FormGroup>
              <Label for="newCategory" className={styles.addCategory}>Add New Category</Label>
              <Input
                type="text"
                name="newCategory"
                id="newCategory"
                value={newCategory}
                onChange={handleInputChange}
                className="mr-sm-2"
              />
            </FormGroup>
            <Button color="primary" type="submit">Add</Button>
          </Form>
        </Col>
      </Row>

      {selectedCategory && (
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Edit Category</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={selectedCategory?.name}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleEditCategory}>Save</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      )}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get('http://192.168.3.122:8081/v1/category');
    return {
      props: {
        initialCategories: response?.data,
      },
    };
  } catch (error) {
    return {
      props: {
        initialCategories: [],
      },
    };
  }
};

export default CategoryPage;