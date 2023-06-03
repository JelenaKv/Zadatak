function Menu ({active, setActive, setCategory}){
    const links= [
        {id:1, name: "General", value:"general"},
        {id:2, name: "Business", value:"business"},
        {id:3, name: "Health", value:"health"},
        {id:4, name: "Science", value:"science"},
        {id:5, name: "Sports", value:"sports"},
        {id:6, name: "Technology", value:"technology"},
        {id:7, name: "Favorites", value:"favorites"},
    ]

    function onClick(id,value){
        setActive(id)
        setCategory(value)
    }

    return(
        <nav className="menu">
            <ul>
                {links.map(link=>(
                    <li
                    key={link.id}
                    className={active===link.id? "active" : "inactive"}
                    onClick={()=>onClick(link.id,link.value)}
                    >
                        {link.name}
                    </li>

                ))}
            </ul>

        </nav>
    )

}
export default Menu
