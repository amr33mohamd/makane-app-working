import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translation: {
            "Home": "Home",
            "resturants":"Resturants",
            "cafe":"Cafe",
            "calender":"Calender",
            "comming":"Comming",
            "previous":"Previous",
            "Website":"Location",
            "Arrived":"Arrived"
        }
    },
    ar: {
        translation: {
            "Home": "الرئيسيه",
            "resturants":"مطاعم",
            "cafe":"كافيهات",
            "calender":"الحجوزات",
            "comming":"القادم",
            "previous":"السابق",
            "Coupons":"خصومات",
            "Profile":"معلومات",
            "Cafe":"كافيه",
            "Availability":"التوفر",
            "Search":"بحث",
            "person available":" عدد اشخاص للحجز ",
            "Overview":"عن المكان",
            "Reviews":"تقيمات",
            "Website":"الموقع",
            "Special Events":"احداث اليوم",
            "Book":"احجز",
            "Book Now":"احجز الان",
            "Person":' شخص ',
            "Are you sure you want to book now!":'هل انت متاكد انك تريد الحجز الان',
            "You can cancel your reservation 30 minutes after reserve. Note that 2 reservation without attending you will be baned":'' +
            'يمكنك الغاء الحجز قبل ٣٠ دقيقه من الان. ملحوظه عدم الحضور الي حجزين متتالين يمنعك من استخدام التطبيق',
            "Cancel":'الغاء',
            "Status":'الحاله',
            "Address":'العنوان',
            "Time":'الوقت',
            "Rate":'تقييم',
            "Rate Us!":"قيمنا",
            "Skip":"تخطي",
            "Are you sure you want tell that he  arrived?":"هل انت متاكد من تحديد ان العميل وصل",
            "Are you sure you want tell that he didn't arrive":"هل انت متاكد من تحديد ان العميل لم يصل",
            "Percent":"النسبه",
            "Delete":"حذف",
            "Sure you want to buy this coupon":"هل انت متاكد من شراء هذا الخصم",
            "Buy":"شراء",
            "Point":"نقطه",
            "Show":"عرض",
            "Show coupon for store":"اعرض الخصم للمحل",
            "Owned":"ملكي",
            "to get points give this code to people to sign up with":"للحصول علي النقاط اجعل شخص يسجل ب هذا الكود",
            "Name":"الاسم",
            "Email":"البريد الالكتروني",
            "Password":"كلمه السر",
            "Change Langauage to ":"تغير اللغه الي ",
            "Save":"حفظ",
            "Log Out":"تسجيل الخروج",
            "Points":"نقاط",
            "Login":"تسجيل الدخول",
            "New User ?":"مستخدم جديد ؟",
            "Already have an account ?":"لديك حساب ب الفعل ؟",
            "Invitation Code":"كود الدعوه",
            "Phone (start with country code)":"رقم الهاتف مع كود الدوله",
            "available":"المتاح",
            "Upload intro image":"رفع الصوره الاساسيه",
            "Upload secondary image":"رفع الصور الفرعيه",
            "Description Arabic":"الوصف العربي",
            "Description English":"الوصف الانجليزي",
            "Payment":"الدفع",
            "Reservations":"الحجوزات",
            "Events":"الاحداث",
            "User Name":"اسم العميل",
            "User Phone":"رقم العميل",
            "Add Event":"اضافه حدث",
            "To":"الي",
            "From":"من",
            "Amount":"المبلغ",
            "Pay":"الدفع",
            "Scan Coupon":'فحص خصم',
            "Arrived":"وصل"


        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
