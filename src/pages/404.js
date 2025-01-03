import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <p className="lead">Oops! The page you are looking for does not exist.</p>
          <Link href="/" passHref>
            <Button color="primary">Go Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Custom404;