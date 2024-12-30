// import React, { useState } from 'react';
// import { Search, Plus, LogOut, User, Eye, EyeOff, Copy, Save, Share2, Send, Mail, Twitter, Facebook ,X} from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Dashboard.css';
// import axios from 'axios';


// // Composant ShareMenu
// const ShareMenu = ({ item, onClose }) => {
//   const shareUrl = encodeURIComponent(window.location.href);
//   const shareText = encodeURIComponent(`Informations de connexion pour ${item.site}`);

//   const handleCopyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(window.location.href);
//       alert('Lien copié dans le presse-papier !');
//     } catch (err) {
//       console.error('Erreur lors de la copie :', err);
//     }
//   };

//   const shareOptions = [
//     {
//       name: 'Copier le lien',
//       icon: <Copy size={16} />,
//       action: handleCopyLink,
//       color: '#6b7280',
//     },
//     {
//       name: 'WhatsApp',
//       icon: <Send size={16} />,
//       url: `https://wa.me/?text=${shareText}%20${shareUrl}`,
//       color: '#25D366',
//     },
//     {
//       name: 'Email',
//       icon: <Mail size={16} />,
//       url: `mailto:?subject=${shareText}&body=${shareUrl}`,
//       color: '#EA4335',
//     },
//   ];

//   const handleShare = (option) => {
//     if (option.action) {
//       option.action();
//     } else if (option.url) {
//       window.open(option.url, '_blank', 'width=600,height=400');
//     }
//     if (!option.action) onClose();
//   };

//   return (
//     <div className="share-menu">
//       {shareOptions.map((option) => (
//         <button
//           key={option.name}
//           className="share-button"
//           onClick={() => handleShare(option)}
//           style={{ color: option.color }}
//         >
//           {option.icon}
//           {option.name}
//         </button>
//       ))}
//     </div>
//   );
// };

// // Composant principal Dashboard
// const Dashboard = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [gridItems, setGridItems] = useState([
//     { id: 1, title: 'Item 1', username: 'Riyad', password: 'mdp1', site: 'YouTube.com' },
//     { id: 2, title: 'Item 2', username: 'Riyad', password: 'mdp2', site: 'Facebook.com' },
//   ]);
//   const navigate = useNavigate();
  

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const openItemModal = (item) => {
//     setSelectedItem({ ...item });
//     setIsModalOpen(true);
//     setIsEditing(false);
//   };

//   const copyToClipboard = async (text) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       alert('Copié dans le presse-papier !');
//     } catch (err) {
//       console.error('Erreur lors de la copie :', err);
//     }
//   };

//   const handleSave = (editedItem) => {
//     setGridItems((prevItems) =>
//       prevItems.map((item) => (item.id === editedItem.id ? editedItem : item))
//     );
//     setIsEditing(false);
//   };

//   const handleDelete = () => {
//     setGridItems((prevItems) =>
//       prevItems.filter((item) => item.id !== selectedItem.id)
//     );
//     setIsModalOpen(false);
//     setSelectedItem(null);
//   };

//   // Fonction pour filtrer les éléments selon la recherche
//   const filteredItems = gridItems.filter((item) => {
//     const searchLower = searchQuery.toLowerCase();
//     return (
//       item.site.toLowerCase().includes(searchLower) ||
//       item.username.toLowerCase().includes(searchLower) ||
//       (item.note && item.note.toLowerCase().includes(searchLower))
//     );
//   });

//   const clearSearch = () => {
//     setSearchQuery('');
//   };

//   const CredentialModal = ({ item, onClose }) => {
//     const [editedItem, setEditedItem] = useState(item);
//     const [showShareMenu, setShowShareMenu] = useState(false);

//     const handleSaveChanges = () => {
//       handleSave(editedItem); // Sauvegarde les modifications
//       setIsModalOpen(false); // Ferme la modal
//       setSelectedItem(null); // Réinitialise l'état sélectionné
//     };


//     return (
//       <div className="modal-overlay" onClick={onClose}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <div className="credential-form">
//             <div className="form-group">
//               <label>Nom d'utilisateur</label>
//               <div className="input-group">
//                 <input
//                   type="text"
//                   value={editedItem.username}
//                   readOnly={!isEditing}
//                   className="form-input"
//                   onChange={(e) => setEditedItem({ ...editedItem, username: e.target.value })}
//                 />
//                 <button className="icon-button" onClick={() => copyToClipboard(editedItem.username)}>
//                   <Copy size={16} />
//                 </button>
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Mot de passe</label>
//               <div className="input-group">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={editedItem.password}
//                   readOnly={!isEditing}
//                   className="form-input"
//                   onChange={(e) => setEditedItem({ ...editedItem, password: e.target.value })}
//                 />
//                 <button
//                   className="icon-button"
//                   style={{ right: '40px' }}
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//                 <button
//                   className="icon-button"
//                   onClick={() => copyToClipboard(editedItem.password)}
//                 >
//                   <Copy size={16} />
//                 </button>
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Sites</label>
//               <div className="input-group">
//                 <input
//                   type="text"
//                   value={editedItem.site}
//                   readOnly={!isEditing}
//                   className="form-input"
//                   onChange={(e) => setEditedItem({ ...editedItem, site: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Remarque</label>
//               <div className="input-group">
//                 <input
//                   type="text"
//                   value={editedItem.note || ''}
//                   placeholder="Aucune note ajoutée"
//                   className="form-input"
//                   readOnly={!isEditing}
//                   onChange={(e) => setEditedItem({ ...editedItem, note: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="button-group">
//               <div className="left-buttons">
//                 {isEditing ? (
//                   <button className="action-button" onClick={handleSaveChanges}>
//                     <Save size={16} />
//                     Sauvegarder
//                   </button>
//                 ) : (
//                   <button className="action-button" onClick={() => setIsEditing(true)}>
//                     Modifier
//                   </button>
//                 )}
//                 <button className="action-button delete" onClick={handleDelete}>
//                   Supprimer
//                 </button>
//               </div>
              
//               <div style={{ position: 'relative' }}>
//                 <button
//                   className="action-button share"
//                   onClick={() => setShowShareMenu(!showShareMenu)}
//                 >
//                   <Share2 size={16} />
//                   Partager
//                 </button>
//                 {showShareMenu && (
//                   <ShareMenu item={editedItem} onClose={() => setShowShareMenu(false)} />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };



//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [newItem, setNewItem] = useState({
//     username: '',
//     password: '',
//     site: '',
//   });

//   const [showNewPassword, setShowNewPassword] = useState(false);

//   // Ajoutez cette fonction pour gérer l'ajout
//   const handleAdd = () => {
//     if (!newItem.username || !newItem.password || !newItem.site) {
//       alert('Veuillez remplir tous les champs');
//       return;
//     }
  
//     const newId = Math.max(...gridItems.map(item => item.id), 0) + 1;
//     const itemToAdd = {
//       id: newId,
//       ...newItem,
//     };
  
//     // Ajoute l'élément dans la liste des items
//     setGridItems([...gridItems, itemToAdd]);
  
//     // Réinitialise uniquement après validation
//     setNewItem({ username: '', password: '', site: '' });
//     setIsAddModalOpen(false);
//   };
  

//   // Ajoutez ce composant modal
//   const AddModal = () => (
//     <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>Ajouter un nouveau mot de passe</h2>
//         </div>
//         <div className="credential-form">
//           <div className="form-group">
//             <label>Nom d'utilisateur</label>
//             <div className="input-group">
//               <input
//                 type="text"
//                 value={newItem.username || ''}
//                 className="form-input"
//                 onChange={(e) => setNewItem((prevState) => ({ ...prevState, username: e.target.value }))}
//                 placeholder="Entrez le nom d'utilisateur"
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Mot de passe</label>
//             <div className="input-group">
//               <input
//                 type={showNewPassword ? 'text' : 'password'}
//                 value={newItem.password || ''}
//                 className="form-input"
//                 onChange={(e) =>
//                   setNewItem((prevState) => ({ ...prevState, password: e.target.value }))
//                 }
//                 placeholder="Entrez le mot de passe"
//               />
//               <button
//                 className="icon-button"
//                 style={{ right: '10px' }}
//                 onClick={() => setShowNewPassword(!showNewPassword)}
//               >
//                 {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Lien du site</label>
//             <div className="input-group">
//               <input
//                 type="text"
//                 value={newItem.site || ''}
//                 className="form-input"
//                 onChange={(e) =>
//                   setNewItem((prevState) => ({ ...prevState, site: e.target.value }))
//                 }
//                 placeholder="Entrez le lien du site"
//               />
//             </div>
//           </div>

//           <div className="button-group">
//             <button 
//               className="action-button cancel" 
//               onClick={() => setIsAddModalOpen(false)}
//             >
//               Annuler
//             </button>
//             <button 
//               className="action-button" 
//               onClick={handleAdd}
//             >
//               Ajouter
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );


// return (
//   <div className="dashboard-container">
//     <div className="dashboard-header">
//       <div className="search-container">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Rechercher..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         {searchQuery && (
//           <button 
//             className="clear-search-button"
//             onClick={clearSearch}
//           >
//             <X size={16} />
//           </button>
//         )}
//       </div>
//       <div className="actions-container">
//         <button className="add-button" onClick={() => setIsAddModalOpen(true)}>
//           <Plus size={20} />
//           Ajouter
//         </button>
//         <div className="profile-menu-container">
//           <button
//             className="profile-button"
//             onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
//           >
//             <img
//               src="https://ui-avatars.com/api/?name=User&background=random"
//               alt="Profile"
//               className="avatar-image"
//             />
//           </button>
//           {isProfileMenuOpen && (
//             <div className="profile-dropdown">
//               <button className="profile-option" onClick={() => navigate('/profile')}>
//                 <User size={16} />
//                 Profile
//               </button>
//               <button className="profile-option" onClick={handleLogout}>
//                 <LogOut size={16} />
//                 Déconnexion
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//     {isAddModalOpen && <AddModal />}
//     <div className="grid-container">
//       {filteredItems.length > 0 ? (
//         filteredItems.map((item) => (
//           <div key={item.id} className="grid-item" onClick={() => openItemModal(item)}>
//             <h3 className="grid-item-title">{item.site}</h3>
//           </div>
//         ))
//       ) : (
//         <div className="no-results">
//           <p>Aucun mot de passe trouvé</p>
//         </div>
//       )}
//     </div>
//     {isModalOpen && selectedItem && (
//       <CredentialModal
//         item={selectedItem}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedItem(null);
//           setIsEditing(false);
//         }}
//       />
//     )}
//   </div>
// );
// };

// export default Dashboard;






import React, { useState, useEffect } from 'react';
import { Search, Plus, LogOut, User, Eye, EyeOff, Copy, Save, Share2, Send, Mail, Twitter, Facebook ,X} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]); // Nouvel état pour les utilisateurs
  const [gridItems, setGridItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  // Appel de l'API pour récupérer les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://www.melivecode.com/api/users');
        setUsers(response.data); // Stocker les utilisateurs dans l'état
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    };
    fetchUsers();
  }, []);

  // Gestion de la recherche
  const filteredUsers = users.filter((user) =>
    user.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-button" onClick={clearSearch}>
              <X size={16} />
            </button>
          )}
        </div>
        <div className="actions-container">
          <button className="add-button">
            <Plus size={20} />
            Ajouter
          </button>
          <div className="profile-menu-container">
            <button
              className="profile-button"
              onClick={() => navigate('/profile')}
            >
              <img
                src="https://ui-avatars.com/api/?name=User&background=random"
                alt="Profile"
                className="avatar-image"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="grid-container">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="grid-item">
              <img src={user.avatar} alt={user.fname} className="user-avatar" />
              <h3 className="grid-item-title">{user.fname} {user.lname}</h3>
              <p className="grid-item-subtitle">{user.username}</p>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>Aucun utilisateur trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
