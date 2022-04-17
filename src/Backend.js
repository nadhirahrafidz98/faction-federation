import './Backend.css';
import { InsertForm } from './components/InsertForm'
import { UpdateForm } from './components/UpdateForm'
import { BackendTable } from './components/BackendTable'


function Backend(){
    return(
        <div>
            <div class="title">
                <h1 class="title-font">Admin</h1>
            </div>
            <BackendTable/>
            <UpdateForm/>
            <InsertForm/>
        </div>
    )
}

export { Backend };