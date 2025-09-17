import TimeRenderer from './footer/TimeRenderer';
import '../../assets/scss/Footer.scss'

export default function Footer() {
    return (
        <div className='footer-container'>
            <div className='main-footer'>
                <p>God Bless us All</p>
            </div>
            <TimeRenderer />
        </div>
    )
}
