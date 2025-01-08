import React from 'react'
import Item from './item'

const Table = () => {
  return (
    <section>
        <table className='table'>
            <thead>
                <th scope='col'>Name</th>
                <th scope='col'>Artist</th>
                <th scope='col'>Album</th>
                <th scope='col'>Duration</th>
            </thead>
            <tbody>
                <Item
                title="holi"
                album="mama"
                artist="mama"
                duration="1:30"
                />
            </tbody>
        </table>
    </section>
  )
}

export default Table