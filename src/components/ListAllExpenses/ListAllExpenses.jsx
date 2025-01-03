import React, { useState } from 'react';
import { Table, Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import styles from './ListAllExpenses.module.css';
import DateRangePicker from '../DateRangePicker/DateRangePicker';

const ListAllExpenses = ({ error, expenses, onChange, onEdit, onDelete }) => {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const toggleModal = () => setModal(!modal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const onDateRangeChange = (dateRange) => {
    console.log({dateRange})
    onChange(dateRange);
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    toggleModal();
  };

  const handleSave = async () => {
    console.log({selectedExpense})
    if (selectedExpense.date && selectedExpense.category && selectedExpense.description && selectedExpense.amount > 0) {
      try {
        const response = await fetch(`https://api.example.com/expenses/${selectedExpense.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedExpense),
        });

        if (!response.ok) {
          throw new Error('Failed to update expense');
        }

        const updatedExpense = await response.json();
        onEdit(updatedExpense);
        toggleModal();
      } catch (error) {
        setSaveError(error.message);
      }
    } else {
      setSaveError('All fields are required and amount should be greater than 0');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedExpense({ ...selectedExpense, [name]: value });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://api.example.com/expenses/${selectedExpense.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }

      onDelete(selectedExpense);
      toggleDeleteModal();
    } catch (error) {
      setDeleteError(error.message);
    }
  };

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    toggleDeleteModal();
  };

  return (
    <>
      <h3 className={styles.heading}>Track your Expenses</h3>

      <DateRangePicker onDateRangeChange={onDateRangeChange} />

      {error ? (
        <Alert color="danger">{error}</Alert>
      ) : (
        <Table striped responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((expense, index) => (
              <tr key={index}>
                <td>{expense?.date}</td>
                <td>{expense?.category}</td>
                <td>{expense?.description}</td>
                <td>{expense?.amount}</td>
                <td>
                  <Button color="warning" onClick={() => handleEdit(expense)}>Edit</Button>
                  <Button color="danger" onClick={() => handleDeleteClick(expense)} style={{marginLeft: '15px'}}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {selectedExpense && (
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Edit Expense</ModalHeader>
          <ModalBody>
            {saveError && <Alert color="danger">{saveError}</Alert>}
            <Form>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={selectedExpense.date}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  type="text"
                  name="category"
                  id="category"
                  value={selectedExpense.category}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  value={selectedExpense.description}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Amount</Label>
                <Input
                  type="number"
                  name="amount"
                  id="amount"
                  value={selectedExpense.amount}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSave}>Save</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      )}

      {selectedExpense && (
        <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
          <ModalHeader toggle={toggleDeleteModal}>Delete Expense</ModalHeader>
          <ModalBody>
            {deleteError && <Alert color="danger">{deleteError}</Alert>}
            <p>Are you sure you want to delete this expense?</p>
            <p><strong>Date:</strong> {selectedExpense.date}</p>
            <p><strong>Category:</strong> {selectedExpense.category}</p>
            <p><strong>Description:</strong> {selectedExpense.description}</p>
            <p><strong>Amount:</strong> {selectedExpense.amount}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDelete}>Delete</Button>{' '}
            <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default ListAllExpenses;