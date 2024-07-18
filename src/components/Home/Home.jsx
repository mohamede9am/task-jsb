import { useContext, useEffect, useState } from 'react';
import styles from './Home.module.css';
import { CartContext } from '../../Context/CartContext';
import AddContact from '../AddContact/AddContact';
import EditContact from '../EditUser/EditContact';
import { toast } from 'react-toastify';


export default function Home() {
  const [users, setUsers] = useState(null);
  const { getDataFromApi, deleteContact } = useContext(CartContext);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

 

  const getData = async () => {
    const res = await getDataFromApi({ page, limit });
    setUsers(res.data.data);
  };
  const deleteContactBtn = async (id) => {
    const res = await deleteContact(id);
    console.log(res)
    if (res.status === 200) {
      toast.success("Deleted!")
    } else {
      toast.error("Something went wrong")
    }
    getData()
  };

  useEffect(() => {
    getData();
  }, [getDataFromApi, page]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNext = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedContact(null);
  };

  return (
    <>
      <div className={styles.box}>
        <div className={styles.searchBar}>
          <input type="text" className="form-control" placeholder="Search by Name" />
        </div>
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add New Contact</button>
        </div>

        {users?.map((user) => (
          <div key={user.id} className={styles.contactItem}>
            <img src={user?.picture} alt={`${user?.firstName} ${user?.lastName}`} />
            <div>
              <h5 className="mb-0">{user?.firstName} {user?.lastName}</h5>
              <p className="mb-0">{user?.phone}</p>
            </div>
            <div className={styles.contactActions}>
              <button className="btn btn-info btn-sm mx-1" onClick={() => {
                setSelectedContact(user);
                setShowEditModal(true);
              }}>Edit</button>
              <button className="btn btn-danger btn-sm mx-1" onClick={() => deleteContactBtn(user.id)}>Delete</button>
            </div>
          </div>
        ))}

        <div className="pagination-container mt-4">
          <ul className="pagination justify-content-end">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePrevious} tabIndex="-1" aria-disabled={page === 1}>Previous</button>
            </li>
            <li className="page-item"><button className="page-link" onClick={() => setPage(1)}>1</button></li>
            <li className="page-item"><button className="page-link" onClick={() => setPage(2)}>2</button></li>
            <li className="page-item"><button className="page-link" onClick={() => setPage(3)}>3</button></li>
            <li className="page-item">
              <button className="page-link" onClick={handleNext}>Next</button>
            </li>
          </ul>
        </div>
      </div>

      <AddContact show={showAddModal} handleClose={closeModal} refreshContacts={getData} />
      {selectedContact && (
        <EditContact
          show={showEditModal}
          handleClose={closeModal}
          contact={selectedContact}
          refreshContacts={getData}
        />
      )}


    </>
  );
}
