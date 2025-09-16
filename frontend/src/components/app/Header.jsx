import { useContext } from 'react';
import { PageContext } from '../../contexts/PageContext';
import '../../assets/scss/Header.scss'

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
            <div className='tab-scroller'>
                <div id='left-tab'>
                    <span className='tab-link' onClick={() => CycleTabs('left')}>{leftIndex != null ? tabs[leftIndex] : ''}</span>
                </div>
                <div id='middle-tab'>
                    <span className='tab-link'>{tabs[midIndex]}</span>
                </div>
                <div id='right-tab'>
                    <span className='tab-link' onClick={() => CycleTabs('right')}>{rightIndex != null ? tabs[rightIndex] : ''}</span>
                </div>
            </div> 
        </div>
    )
}

export default Header
