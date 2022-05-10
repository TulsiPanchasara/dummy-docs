import { userLogout } from '../auth/auth'
import TableView from '../components/containers/TableView'
import withAuthentication from '../components/HOC/withAuthentication'
import { loginType } from '../interface/session'

interface IHomeProps{
  userSession: loginType
}

const Home = (props: IHomeProps) => {
  const {userSession} = props;
  
  return (
    <div>
      <nav style={{ borderBottom: "1px solid black", padding: "0px 40px", display: "flex",width:"100%", justifyContent: "space-between" }} >
        <h1>Documents</h1>
        {userSession && userSession.email && <div style={{ display: "flex", alignItems:"center" }} >
          <div style={{ paddingRight: "10px" }} >{userSession.email}</div>
          <a style={{ cursor: "pointer" }} onClick={() => userLogout()} >Logout</a>
        </div>}
      </nav>
      <div style={{  padding: "10px 40px", display: "flex",width:"100%", justifyContent: "space-between" }}  >
        <div style={{ fontWeight:  "bold", fontSize:"25px" }} >List of Documents</div>
        <button style={{ background:"black", color:"white", borderRadius:"5px", fontSize:"14px" }} ><a href="/docs/add">+ Add New Doc</a></button>
      </div>
      <TableView/>
    </div>
  )
}

export default withAuthentication(Home, 'Home')
