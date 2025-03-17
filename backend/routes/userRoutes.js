const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
    try {
        const users = await User.find(); // Lấy tất cả user trong database
        res.status(200).json(users);
    } catch (error) {
        console.error("Lỗi server:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
});
// ✅ API đăng nhập (Không dùng bcrypt và JWT)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra xem email có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Tên người dùng hoặc mật khẩu không đúng." });
        }

        // So sánh mật khẩu trực tiếp
        if (user.password !== password) {
            return res.status(400).json({ message: "Tên người dùng hoặc mật khẩu không đúng." });
        }

        // Loại bỏ mật khẩu trước khi trả về
        const { password: _, ...userData } = user.toObject();

        res.status(200).json({
            message: "Đăng nhập thành công!",
            user: userData, // Trả về toàn bộ thông tin trừ mật khẩu
        });
    } catch (error) {
        console.error("Lỗi server khi đăng nhập:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
});

// API kiểm tra email đã tồn tại hay chưa
router.get("/check-email", async (req, res) => {
    const { email } = req.query;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ exists: true });
        }
        return res.json({ exists: false });
    } catch (error) {
        console.error("Lỗi server khi kiểm tra email:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
});

// Route đăng ký người dùng
router.post("/", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Lỗi server:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
});

// ✅ API đổi mật khẩu
router.post("/change-password", async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        // Kiểm tra xem email có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email không tồn tại." });
        }

        // Kiểm tra mật khẩu cũ
        if (user.password !== oldPassword) {
            return res.status(400).json({ message: "Mật khẩu cũ không đúng." });
        }

        // Cập nhật mật khẩu mới
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Đổi mật khẩu thành công!" });
    } catch (error) {
        console.error("Lỗi server khi đổi mật khẩu:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
});

// ✅ API cập nhật hồ sơ người dùng
router.put("/update-profile", async (req, res) => {
    try {
        const { email, name, gender, birthDate, agreeMarketing } = req.body;

        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại." });
        }

        // Cập nhật thông tin
        user.name = name || user.name;
        user.gender = gender || user.gender;
        user.birthDate = birthDate || user.birthDate;
        user.agreeMarketing = agreeMarketing !== undefined ? agreeMarketing : user.agreeMarketing;

        await user.save();

        res.status(200).json({ message: "Hồ sơ đã được cập nhật thành công!", user });
    } catch (error) {
        console.error("Lỗi server khi cập nhật hồ sơ:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
});

// ✅ API đăng nhập google (Không dùng bcrypt và JWT)
router.post("/google-login", async (req, res) => {
    try {
        const { email } = req.body;

        // Kiểm tra xem email có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Tên người dùng hoặc mật khẩu không đúng." });
        }
        // Loại bỏ mật khẩu trước khi trả về
        const { password: _, ...userData } = user.toObject();

        res.status(200).json({
            message: "Đăng nhập thành công!",
            user: userData, // Trả về toàn bộ thông tin trừ mật khẩu
        });
    } catch (error) {
        console.error("Lỗi server khi đăng nhập:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
});
module.exports = router;
