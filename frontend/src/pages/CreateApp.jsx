import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function CreateApp() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const [fields, setFields] = useState([
    {
      name: "",
      type: "text",
    },
  ]);

  const addField = () => {

    setFields([
      ...fields,
      {
        name: "",
        type: "text",
      },
    ]);
  };

  const handleFieldChange = (
    index,
    key,
    value
  ) => {

    const updated = [...fields];

    updated[index][key] = value;

    setFields(updated);
  };

  const removeField = (index) => {

    if (fields.length === 1) {

      return alert(
        "At least one field required"
      );
    }

    const updated = fields.filter(
      (_, i) => i !== index
    );

    setFields(updated);
  };

  const handleSubmit = async () => {

    try {

      setLoading(true);

      const res = await api.post("/apps", {
        name,
        fields,
      });

      navigate(`/app/${res.data.appId}`);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#F5F5F3] px-6 py-10">

      <div className="max-w-4xl mx-auto bg-white rounded-[28px] border border-[#ECECEC] p-10">

        <div className="flex justify-between items-start mb-10">

          <div>

            <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
              Dynamic Runtime Builder
            </p>

            <h1 className="text-4xl font-bold text-[#2B2B2B]">
              Create Dynamic Application
            </h1>

            <p className="text-gray-500 mt-4 text-lg">
              Configure fields and generate apps instantly
            </p>

          </div>

        
          <button
            onClick={() => navigate(-1)}
            className="text-sm px-5 py-2 rounded-2xl border border-[#E5E5E5] text-gray-600 hover:bg-[#F5F5F3]"
          >
            ← Back
          </button>

        </div>       

        <div className="mb-8">

          <label className="block text-sm font-medium text-gray-600 mb-3">
            Application Name
          </label>

          <input
            placeholder="Enter app name"
            className="w-full border border-[#E5E5E5] rounded-2xl px-5 py-4 outline-none focus:border-[#BBD5DA]"
            onChange={(e) => setName(e.target.value)}
          />

        </div>

        

        <div className="space-y-5">

          {fields.map((field, index) => (

            <div
              key={index}
              className="border border-[#ECECEC] rounded-[24px] p-6 bg-[#FAFAF8]"
            >

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-lg font-semibold text-[#2B2B2B]">
                  Field {index + 1}
                </h2>

                <button
                  onClick={() => removeField(index)}
                  className="text-sm px-4 py-2 rounded-xl border border-[#E5E5E5] text-gray-600"
                >
                  Delete
                </button>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                <div>

                  <label className="block text-sm text-gray-600 mb-2">
                    Field Name
                  </label>

                  <input
                    placeholder="e.g. Email"
                    className="w-full border border-[#E5E5E5] rounded-2xl px-4 py-3 outline-none focus:border-[#BBD5DA]"
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div>

                  <label className="block text-sm text-gray-600 mb-2">
                    Field Type
                  </label>

                  <select
                    className="w-full border border-[#E5E5E5] rounded-2xl px-4 py-3 outline-none focus:border-[#BBD5DA]"
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "type",
                        e.target.value
                      )
                    }
                  >

                    <option value="text">
                      Text
                    </option>

                    <option value="number">
                      Number
                    </option>

                    <option value="email">
                      Email
                    </option>

                    <option value="date">
                      Date
                    </option>

                    <option value="password">
                      Password
                    </option>

                  </select>

                </div>

              </div>

            </div>

          ))}

        </div>

        

        <div className="flex gap-4 mt-10">

          <button
            onClick={addField}
            className="px-6 py-3 rounded-2xl border border-[#DADADA] text-[#2B2B2B]"
          >
            + Add Field
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#2F3645] text-white px-8 py-3 rounded-2xl disabled:opacity-50"
          >
            {loading
              ? "Generating..."
              : "Generate Application"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateApp;