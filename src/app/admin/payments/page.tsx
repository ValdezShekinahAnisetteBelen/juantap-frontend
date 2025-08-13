"use client";
import { useEffect, useState } from "react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const res = await fetch("http://localhost:8000/api/admin/payments", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    setPayments(data);
  };

  const handleAction = async (id: number, action: "approve" | "disapprove") => {
    await fetch(`http://localhost:8000/api/admin/payments/${id}/${action}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchPayments();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Management</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Template</th>
              <th className="px-4 py-2">Method</th>
              <th className="px-4 py-2">Reference</th>
              <th className="px-4 py-2">Receipt</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment: any) => (
              <tr key={payment.id} className="border-b">
                <td className="px-4 py-2">{payment.user?.name}</td>
                <td className="px-4 py-2">{payment.template?.name}</td>
                <td className="px-4 py-2">{payment.payment_method}</td>
                <td className="px-4 py-2">{payment.reference_number || "-"}</td>
                <td className="px-4 py-2">
                  {payment.receipt_img && (
                    <a
                      href={`http://localhost:8000/storage/${payment.receipt_img}`}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  )}
                </td>
                <td className="px-4 py-2">
                  {payment.is_approved ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Pending</span>
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleAction(payment.id, "approve")}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(payment.id, "disapprove")}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Disapprove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
