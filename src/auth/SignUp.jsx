import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookie from "js-cookie";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("🔹 البيانات المرسلة:", data);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/vi/auth/register",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response.data.user);
      const { token, id } = response.data.user;

      // حفظ البيانات في الكوكيز
      Cookie.set("token", token, { expires: 4 });
      Cookie.set("id", id, { expires: 4 });

      // إعادة توجيه المستخدم
      window.location.href = "/";
    } catch (error) {
      console.error("❌ خطأ أثناء الإرسال:", error.response?.data || error);
      alert(error.response?.data?.message || "حدث خطأ أثناء التسجيل");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">تسجيل حساب جديد</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* اسم المستخدم */}
          <div>
            <input
            type="text"
              {...register("username", { required: "اسم المستخدم مطلوب" })}
              placeholder="أدخل اسم المستخدم"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          {/* البريد الإلكتروني */}
          <div>
            <input
              type="email"
              {...register("email", {
                required: "البريد الإلكتروني مطلوب",
                pattern: { value: /\S+@\S+\.\S+/, message: "البريد الإلكتروني غير صحيح" },
              })}
              placeholder="البريد الإلكتروني"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* كلمة المرور */}
          <div>
            <input
              type="password"
              {...register("passwoard", {
                required: "كلمة المرور مطلوبة",
                minLength: { value: 6, message: "يجب أن تكون كلمة المرور على الأقل 6 أحرف" },
              })}
              placeholder="كلمة المرور"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.passwoard && <p className="text-red-500 text-sm">{errors.passwoard.message}</p>}
          </div>

          {/* زر التسجيل */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            تسجيل
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
