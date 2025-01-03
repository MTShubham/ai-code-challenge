import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const CardComponent = ({ title, children }) => {
  return (
    <Card className="custom-card">
      <CardHeader className="custom-card-header">{title}</CardHeader>
      <CardBody className="d-flex justify-content-center align-items-center">
        {children}
      </CardBody>
    </Card>
  );
};

export default CardComponent;