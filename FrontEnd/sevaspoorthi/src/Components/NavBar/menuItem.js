const auth=()=>{
  document.getElementsByClassName("auth")[0].style.cssText='display:flex';
}
export const menuItems = [
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
        title: 'SignUp/Login',
        url: '#',
        onClick:auth
        
      },    
  ];