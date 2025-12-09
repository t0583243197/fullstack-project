import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { useSelector } from "react-redux"

const Navbar = () => {

    const { isUserLoggedIn } = useSelector((state) => state.auth)

    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="/mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/'
        },
        {
            label: 'login',
            icon: 'pi pi-user',
            url: '/login'
        },
        {
            label: 'register',
            icon: 'pi pi-user-plus',
            url: '/register'
        },
        {
            label: 'products',
            icon: 'pi pi-cart-minus',
            url: '/products',
        },
        isUserLoggedIn &&
        {
            label: 'basket',
            icon: 'pi pi-cart-minus',
            url: '/basket',
        },
        isUserLoggedIn &&
        {
            label: 'log out',
            icon: 'pi pi-cart-minus',
            url: '/logOut',
        },
    ];
    return (
        <div className="card">
            <Menubar model={items} />


        </div>
    )
}

export default Navbar;