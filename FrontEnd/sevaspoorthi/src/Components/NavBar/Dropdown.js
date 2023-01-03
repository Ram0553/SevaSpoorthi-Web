function Dropdown({ submenus }){
    return (
      <div className="dropdown">
        {submenus.map((submenu, index) => (
          <div key={index}>
            <a href={submenu.url}>{submenu.title}</a>
          </div>
        ))}
      </div>
    );
  };
  
  export default Dropdown;