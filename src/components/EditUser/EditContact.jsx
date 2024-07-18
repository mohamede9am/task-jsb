import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';

const EditContactSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  phone: Yup.string(),
  email: Yup.string().email('Invalid email'),
  picture: Yup.string().url('Invalid URL')
});

export default function EditContact({ show, handleClose, contact, refreshContacts }) {
  const { editContact } = useContext(CartContext);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await editContact(contact.id, values);
      toast.success('Contact updated successfully');
      refreshContacts();
      handleClose();
    } catch (error) {
        console.log(error)
      toast.error('Failed to update contact');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
            email: contact.email,
            picture: contact.picture
          }}
          validationSchema={EditContactSchema}
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
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
