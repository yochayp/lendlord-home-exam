import lendlordLogo from'../../assets/lendlord.png';
import {AiFillPlusCircle} from 'react-icons/ai';

const Navbar = ({userFormToggle}) => {
    return (
        <nav class="navbar  navbar-light bg-white border-bottom shadow-sm  py-3 px-5">
            <div class="container-fluid">
                <div className='d-flex align-items-center'>
                    <img  src={lendlordLogo} height={50} alt="lendlord-logo"/>
                </div>
                <div className="header-right d-flex">
                    <div className="mx-4">
                    </div>
                    <div className='d-flex'>
                        <button className="add-btn shadow-lg border btn mx-2 px-1 d-flex justify-content-center align-items-center " onClick={() => userFormToggle()}>
                            <AiFillPlusCircle className=''/>
                            <div className='mx-1'>Add User</div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;