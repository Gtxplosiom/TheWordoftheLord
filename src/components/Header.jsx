import { useContext } from 'react';
import { PageContext } from '../contexts/PageContext';
import '../assets/Global.css'
import '../assets/Header.css'

const Header = () => {
    const tabs = ['Read', 'Home', 'About'];

    const {currTab, setCurrtab} = useContext(PageContext);

    const CycleTabs = (direction) => {
        if (direction === 'left' && currTab > 0)
        {
            setCurrtab(currTab - 1);
        }
        else if (direction === 'right' && currTab < tabs.length - 1)
        {
            setCurrtab(currTab + 1);
        }
    }

    // TODO: implement the display of the content based on the tabs here
    const leftIndex = currTab > 0 ? currTab - 1 : null;
    const midIndex = currTab;
    const rightIndex = currTab < tabs.length - 1 ? currTab + 1 : null;

    console.log(leftIndex, currTab, rightIndex);

    return (
        <div className='header-container'>
            <div className='tab-container'>
                <table className='tab-table'>
                    <tbody>
                        <tr>
                            <td id='left' className='tab-link' onClick={() => CycleTabs('left')}>{leftIndex != null ? tabs[leftIndex] : ''}</td>
                            <td id='mid' className='tab-link'>{tabs[midIndex]}</td>
                            <td id='right' className='tab-link' onClick={() => CycleTabs('right')}>{rightIndex != null ? tabs[rightIndex] : ''}</td>
                        </tr>
                    </tbody>
                </table>
            </div> 
        </div>
    )
}

export default Header
