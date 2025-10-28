import React from 'react'
import SidebarCorp from '../components/SidebarCorp'
import Navbar from '../components/Navbar'
import InvoiceForm from '../components/InvoiceForm'
import GetInvoice from '../components/GetInvoice'

const CorpInvoice = ({ session }) => {
    return (
        <div className="flex h-screen bg-gray-50">
            <SidebarCorp session={session} />

            <div className="flex flex-col flex-1">
                <Navbar session={session} />
                <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
                    {/* <MainCalculateTax /> */}
                    <InvoiceForm />
                    <GetInvoice session={session} />
                </main>
            </div>

        </div>
    )
}

export default CorpInvoice
