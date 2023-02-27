import { fireAuth } from "../../Config/Firebase";

const auth = () => {
  document.getElementsByClassName("auth")[0].style.cssText='display:flex';
}

const signOut = () => {
  fireAuth.signOut();
}

function Menuitem({currentUser,checkAdmin}){

  return checkAdmin===true?
  [
    {
        title: 'Home',
        url: '/',
      },
      {
        title: 'About',
        url: '/AboutUs',
        
      },
      {
        title: 'Villages',
        submenu: [
          {
            title: 'Nodal Officers',
            url: '',
          },
          {
            title: 'Map',
            url: '',
          },
          {
            title: 'Donate',
            url: '/Donate',
          },
        ],
      },
      {
        title: 'Donate',
        url: '/Donate',
        
      },
      {
        title: 'Admin Portal',
        url: '/AdminPortal',
      },
      {
        title:currentUser==null?'SignUp/Login':'LogOut',
        onClick:currentUser==null?auth:signOut
        
      },    
  ]:
  [
    {
        title: 'Home',
        url: '/',
      },
      {
        title: 'About',
        url: '/AboutUs',
        
      },
      {
        title: 'Villages',
        submenu: [
          {
            title: 'Nodal Officers',
            url: '',
          },
          {
            title: 'Map',
            url: '',
          },
          {
            title: 'Donate',
            url: '',
          },
        ],
      },
      {
        title: 'Donate',
        url: '/',
        
      },
      {
        title:currentUser==null?'SignUp/Login':'LogOut',
        onClick:currentUser==null?auth:signOut
        
      },    
  ];
}
export default Menuitem
