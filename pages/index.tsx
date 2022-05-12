import TableView from '../components/containers/TableView'
import withAuthentication from '../components/HOC/withAuthentication'

const Home = () => {
  return (
    <div>    
      <div style={{  padding: "10px 40px", display: "flex",width:"100%", justifyContent: "space-between" }}  >
            <div style={{ fontWeight:  "bold", fontSize:"25px" }} >List of Documents</div>
            <button style={{ background:"black", color:"white", borderRadius:"5px", fontSize:"14px" }} ><a href="/docs/add">+ Add New Doc</a></button>
          </div>
      <TableView/>
    </div>
  )
}

export default withAuthentication(Home, 'Home')
