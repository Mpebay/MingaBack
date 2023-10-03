import User from "../../models/User.js";

export default async (req, res, next) => {
   
    const verifyCode = req.params.verify_code;
    console.log(verifyCode)
    try {
      
        const user = await User.findOneAndUpdate(
            { verify_code: verifyCode, verified: false },
            { verified: true }
        );
        
        
        if (!user) {
            return res.status(400).json({
                message: "Código de verificación inválido o cuenta ya verificada.",
            });
        }

        return res.status(200).json({
            message: "Cuenta verificada exitosamente.",
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
};
