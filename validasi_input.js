document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  const fields = {
    username:     document.getElementById("username"),
    password:     document.getElementById("password"),
    nama:         document.getElementById("nama"),
    tanggalLahir: document.getElementById("tanggalLahir"),
    alamat:       document.getElementById("alamat"),
    noTelp:       document.getElementById("noTelp"),
  };

  // Helper menampilkan pesan error
  function setError(input, message) {
    const errEl = document.getElementById("err-" + input.id);
    errEl.textContent = message;
    input.classList.add("border-red-500");
    input.classList.remove("border-gray-300");
  }

  function clearError(input) {
    const errEl = document.getElementById("err-" + input.id);
    errEl.textContent = "";
    input.classList.remove("border-red-500");
    input.classList.add("border-gray-300");
  }

  // ============ ATURAN VALIDASI ============
  function validateUsername() {
    const v = fields.username.value.trim();
    if (!v) { setError(fields.username, "Username tidak boleh kosong"); return false; }
    if (v.length < 3) { setError(fields.username, "Username minimal 3 karakter"); return false; }
    clearError(fields.username); return true;
  }

  function validatePassword() {
    const v = fields.password.value;
    if (!v) { setError(fields.password, "Password tidak boleh kosong"); return false; }
    if (v.length < 8) { setError(fields.password, "Password minimal 8 karakter"); return false; }
    clearError(fields.password); return true;
  }

  function validateNama() {
    const v = fields.nama.value.trim();
    if (!v) { setError(fields.nama, "Nama tidak boleh kosong"); return false; }
    clearError(fields.nama); return true;
  }

  function validateTanggalLahir() {
    const v = fields.tanggalLahir.value;
    if (!v) { setError(fields.tanggalLahir, "Tanggal lahir tidak boleh kosong"); return false; }

    const inputDate = new Date(v);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate > today) {
      setError(fields.tanggalLahir, "Tanggal lahir tidak boleh tanggal yang akan datang");
      return false;
    }
    clearError(fields.tanggalLahir); return true;
  }

  function validateAlamat() {
    const v = fields.alamat.value.trim();
    if (!v) { setError(fields.alamat, "Alamat tidak boleh kosong"); return false; }
    clearError(fields.alamat); return true;
  }

  function validateNoTelp() {
    const v = fields.noTelp.value.trim();
    if (!v) { setError(fields.noTelp, "Nomor telepon tidak boleh kosong"); return false; }
    if (!v.startsWith("62")) {
      setError(fields.noTelp, "Nomor telepon harus diawali dengan 62");
      return false;
    }
    if (!/^62\d+$/.test(v)) {
      setError(fields.noTelp, "Nomor telepon hanya boleh berisi angka setelah 62");
      return false;
    }
    clearError(fields.noTelp); return true;
  }

  // ============ EVENT HANDLING ============
  fields.username.addEventListener("input", validateUsername);
  fields.password.addEventListener("input", validatePassword);
  fields.nama.addEventListener("input", validateNama);
  fields.tanggalLahir.addEventListener("change", validateTanggalLahir);
  fields.alamat.addEventListener("input", validateAlamat);
  fields.noTelp.addEventListener("input", validateNoTelp);

  // Validasi saat submit
  form.addEventListener("submit", function (e) {
    const valid =
      validateUsername() &
      validatePassword() &
      validateNama() &
      validateTanggalLahir() &
      validateAlamat() &
      validateNoTelp();

    if (!valid) {
      e.preventDefault(); // batalkan submit jika ada yang invalid
      alert("Periksa kembali data yang Anda masukkan!");
    }
  });
});