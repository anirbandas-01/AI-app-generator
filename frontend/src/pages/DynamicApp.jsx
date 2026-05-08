import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Navbar from "../components/Navbar";
import DynamicForm from "../components/DynamicForm";
import DynamicTable from "../components/DynamicTable";
import CSVUpload from "../components/CSVUpload";

function DynamicApp() {

  const { id } = useParams();

  const [config, setConfig] = useState(null);

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchConfig = async () => {

    try {

      const res = await api.get(`/apps/${id}`);

      setConfig(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const fetchRecords = async () => {

    try {

      const res = await api.get(`/data/${id}`);

      setRecords(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchConfig();
    fetchRecords();

  }, []);

  const handleSubmit = async (formData) => {

    try {

      await api.post(`/data/${id}`, formData);

      fetchRecords();

      alert("Data saved successfully");

    } catch (err) {

      console.log(err);

      alert("Failed to save data");

    }
  };

  if (loading) {

    return (

      <div className="min-h-screen bg-[#F5F5F3]">

        <Navbar />

        <div className="p-10 text-gray-500">
          Loading application...
        </div>

      </div>

    );
  }

  return (

    <div className="min-h-screen bg-[#F5F5F3]">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        

        <div className="bg-[#EAE4D5] rounded-[30px] p-10 border border-[#DDD6C8]">

          <div className="flex items-start justify-between flex-wrap gap-6">

            <div>

              <p className="uppercase tracking-widest text-sm text-gray-500 mb-4">
                Dynamic Runtime Application
              </p>

              <h1 className="text-5xl font-bold text-[#2B2B2B] leading-tight">
                {config?.name}
              </h1>

              <p className="text-gray-600 text-lg mt-5 max-w-2xl leading-8">
                Config-driven runtime application with
                reusable dynamic forms, table rendering,
                and CSV-based data import system.
              </p>

            </div>
            <div className="flex flex-col gap-4 items-end"> 
            
            <button
                  onClick={() => navigate(-1)}
                  className="text-sm px-5 py-2 rounded-2xl border border-[#E5E5E5] text-gray-600 hover:bg-white transition"
              >
                  ← Back
            </button>
            
            </div>

            <div className="bg-white rounded-[24px] border border-[#ECECEC] px-8 py-6 min-w-[240px]">

              <p className="text-gray-500 text-sm">
                Total Records
              </p>

              <h2 className="text-5xl font-bold text-[#2B2B2B] mt-3">
                {records.length}
              </h2>

            </div>

          </div>

        </div>

        

        <div className="grid lg:grid-cols-3 gap-8 mt-8">

          

          <div className="lg:col-span-1 space-y-8">

          

            <div className="bg-white rounded-[28px] border border-[#ECECEC] p-7">

              <div className="mb-6">

                <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
                  Data Import
                </p>

                <h2 className="text-2xl font-bold text-[#2B2B2B]">
                  CSV Upload
                </h2>

                <p className="text-gray-500 mt-3 leading-7">
                  Import structured records directly
                  into your dynamic application.
                </p>

              </div>

              <CSVUpload
                appId={id}
                onUploadSuccess={fetchRecords}
                fields={config?.config?.fields || []}
              />

            </div>

            

            <div className="bg-white rounded-[28px] border border-[#ECECEC] p-7">

              <div className="mb-6">

                <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
                  Runtime Form
                </p>

                <h2 className="text-2xl font-bold text-[#2B2B2B]">
                  Add New Record
                </h2>

                <p className="text-gray-500 mt-3 leading-7">
                  Dynamically generated form based
                  on your runtime configuration.
                </p>

              </div>

              <DynamicForm
                fields={config?.config?.fields || []}
                onSubmit={handleSubmit}
              />

            </div>

          </div>

        

          <div className="lg:col-span-2">

            <div className="bg-white rounded-[28px] border border-[#ECECEC] overflow-hidden">

              

              <div className="px-8 py-7 border-b border-[#ECECEC] flex justify-between items-center">

                <div>

                  <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
                    Dynamic Data Table
                  </p>

                  <h2 className="text-2xl font-bold text-[#2B2B2B]">
                    Application Records
                  </h2>

                </div>

                <div className="bg-[#F5F5F3] px-5 py-3 rounded-2xl text-sm text-gray-600">
                  {records.length} Entries
                </div>

              </div>

            

              <div className="p-6 overflow-x-auto">

                <DynamicTable
                  fields={config?.config?.fields || []}
                  records={records}
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DynamicApp;