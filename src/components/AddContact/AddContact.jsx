import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';

const AddContactSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  phone: Yup.string().required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  picture: Yup.string().url('Invalid URL').required('Picture URL is required')
});

export default function AddContact({ show, handleClose, refreshContacts }) {
  const { sendDataToApi } = useContext(CartContext);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
   const res =  await sendDataToApi(values);
   if(res.status === 200 ){
    toast.success("Contact added!")
   } else{
    toast.error("Something went wrong")
   }
    resetForm();
    setSubmitting(false);
    refreshContacts();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            picture: ''
          }}
          validationSchema={AddContactSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <Field name="firstName" className="form-control" />
                <ErrorMessage name="firstName" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <Field name="lastName" className="form-control" />
                <ErrorMessage name="lastName" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <Field name="phone" className="form-control" />
                <ErrorMessage name="phone" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="picture" className="form-label">Picture URL</label>
                <Field name="picture" className="form-control" />
                <ErrorMessage name="picture" component="div" className="text-danger" />
              </div>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Save Contact
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
