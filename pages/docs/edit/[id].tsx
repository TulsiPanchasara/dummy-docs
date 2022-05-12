import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import AddEditForm from '../../../components/containers/AddEditForm'

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
          <title>Dummy Docs - Edit Doc</title>
      </Head>
      <AddEditForm id={id as string} />
    </>
  )
}

export default index