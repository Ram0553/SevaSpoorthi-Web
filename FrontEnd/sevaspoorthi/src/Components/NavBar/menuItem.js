import { fireAuth } from "../../Config/Firebase";

const auth = () => {
  document.getElementsByClassName("auth")[0].style.cssText='display:flex';
}

const signOut = () => {
  fireAuth.signOut();
}

const adminPortal = () => {
  //route to admin portal
}

function Menuitem({currentUser,checkAdmin}){

  return checkAdmin==true?
  [
    {
        title: 'Home',
        url: '#',
      },
      {
        title: 'About',
        url: '#',
        
      },
      {
        title: 'Villages',
        url: '#',
        submenu: [
          {
            title: 'Nodal Officers',
            url: '#',
          },
          {
            title: 'Map',
            url: '#',
          },
          {
            title: 'Donate',
            url: '#',
          },
        ],
      },
      {
        title: 'Donate',
        url: '#',
        
      },
      {
        title: 'Admin Portal',
        url: '#',
        onClick:adminPortal,
      },
      {
        title:currentUser==null?'SignUp/Login':'LogOut',
        url: '#',
        onClick:currentUser==null?auth:signOut
        
      },    
  ]:
  [
    {
        title: 'Home',
        url: '#',
      },
      {
        title: 'About',
        url: '#',
        
      },
      {
        title: 'Villages',
        url: '#',
        submenu: [
          {
            title: 'Nodal Officers',
            url: '#',
          },
          {
            title: 'Map',
            url: '#',
          },
          {
            title: 'Donate',
            url: '#',
          },
        ],
      },
      {
        title: 'Donate',
        url: '#',
        
      },
      {
        title:currentUser==null?'SignUp/Login':'LogOut',
        url: '#',
        onClick:currentUser==null?auth:signOut
        
      },    
  ];
}
export default Menuitem
