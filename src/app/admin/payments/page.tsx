"use client";
import { useEffect, useState } from "react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      <h1 className="text-3xl font-bold mb-6">Payment Management</h1>
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 font-semibold text-gray-600">User</th>
              <th className="px-5 py-3 font-semibold text-gray-600">Template</th>
              <th className="px-5 py-3 font-semibold text-gray-600">Method</th>
              <th className="px-5 py-3 font-semibold text-gray-600">Reference</th>
              <th className="px-5 py-3 font-semibold text-gray-600">Receipt</th>
              <th className="px-5 py-3 font-semibold text-gray-600">Status</th>
              <th className="px-5 py-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment: any) => (
              <tr
                key={payment.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-5 py-3">{payment.user?.name}</td>
                <td className="px-5 py-3">{payment.template?.name}</td>
                <td className="px-5 py-3 capitalize">{payment.payment_method}</td>
                <td className="px-5 py-3">{payment.reference_number || "-"}</td>
                <td className="px-5 py-3">
                  {payment.receipt_img && (
                    <button
                      onClick={() =>
                        setSelectedImage(
                          `http://localhost:8000/storage/${payment.receipt_img}`
                        )
                      }
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      View
                    </button>
                  )}
                </td>
                <td className="px-5 py-3">
                  {payment.is_approved ? (
                    <span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                      Approved
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-5 py-3 space-x-2">
                  <button
                    onClick={() => handleAction(payment.id, "approve")}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(payment.id, "disapprove")}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
                  >
                    Disapprove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Receipt"
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
