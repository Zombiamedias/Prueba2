import React from 'react'

const Table = () => {
  return (
    <section>
        <table className='table'>
            <thead>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Artist</th>
                <th scope='col'>Album</th>
                <th scope='col'>Duration</th>
            </thead>
        </table>
    </section>
  )
}

export default Table