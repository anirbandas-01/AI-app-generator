import { supabase } from "../db.js";

export const createApp = async (req, res) => {
    try {
        const { name, fields, user_id } = req.body;

        const appId = Date.now().toString();

        const { error } = await supabase
         .from("apps")
         .insert([
            {
                id: appId,
                name,
                user_id,
                config: { fields }
            }
         ]);

         if(error) {
            return res.status(400).json({
                error: error.message
            });
         }

         res.json({ appId });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


export const getApp = async (req, res) => {
    try {
        const { data, error } = await supabase
         .from("apps")
         .select("*")
         .eq("id", req.params.id)
         .single();

         if (error) {
            return res.status(400).json({
                error: error.message
            });
         }

         res.json(data);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

