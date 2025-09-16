import TimeRenderer from './footer/TimeRenderer';
import '../../assets/scss/Footer.scss'

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='main-footer'>
                <p>God Bless us All</p>
            </div>
            <TimeRenderer />
        </div>
    )
}

export default Footer
