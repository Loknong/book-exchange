import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const formMenu = [
    {
        name: "Regular Form", link: "/form/regular"
    },
    {
        name: "React Hook Form", link: "/form/hook-form"
    },
    {
        name: "Exchange Book Regular", link: "/form/exchange-regular"
    },
    {
         name: "Exchange Book With Form", link: "/form/exchange-hook-form"
    },

]

const ReactFormPage = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col container">
            <div className="py-4">
                <ul className="flex space-x-4">
                    {formMenu.map((menu, index) => (
                        <li key={index} className="cursor-pointer" onClick={() => navigate(menu.link)}>{menu.name}</li>
                    ))}
                </ul>
            </div>
            <div className="container">

                <Outlet />
            </div>
        </div>
    )
}

export default ReactFormPage