import BookSelector from '../components/read-page/BookSelector'
import Reader from '../components/read-page/Reader'
import ToolSelector from '../components/read-page/ToolSelector'
import '../assets/ReadPage.css'

const ReadPage = () => {
    return (
        <div className='read-page-container'>
            <BookSelector />
            <Reader />
            <ToolSelector />
        </div>
    )
}

export default ReadPage
