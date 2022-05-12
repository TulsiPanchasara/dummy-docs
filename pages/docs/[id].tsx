import { useRouter } from 'next/router';
import React from 'react';
import { deleteDoc } from '../../auth/docsCRUD';
import ViewData from '../../components/containers/ViewData';
import withAuthentication from '../../components/HOC/withAuthentication';
import { TIMEOUT_VALUE } from '../../config/constants';

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const deleteData = () => {
    const response = deleteDoc(Number(id));
    if (response) {
      setTimeout(() => {
        router.push('/')
      }, TIMEOUT_VALUE);
    }
  }


  return (
    <div>
      <div style={{ padding: "10px 40px", display: "flex", width: "100%", justifyContent: "space-between" }}  >
        <div style={{ fontWeight: "bold", fontSize: "25px", display:"flex", justifyContent:"center", alignItems:"center" }} >
          <a href="/"><i style={{ fontSize:"20px", marginRight:"8px" }} className="fa fa-arrow-left"></i></a>
          Document ID: {id}</div>
        <div>
          <button style={{ background: "black", color: "white", borderRadius: "5px", fontSize: "14px", marginRight:"10px" }} ><a href={`/docs/edit/${id}`}>Edit</a></button>
          <button style={{ background:"black", color:"white", borderRadius:"5px", fontSize:"14px" }} onClick={() => deleteData()} >Delete</button>
        </div>
      </div>
      <ViewData id={id as string} />
    </div>
  )
}

export default withAuthentication(index, 'View')