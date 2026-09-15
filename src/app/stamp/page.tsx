import Link from "next/link";

export const metadata = {
  title: "สะสมแสตมป์ดิจิทัล • GreenPass Mobile App",
  description: "ดาวน์โหลดแอปพลิเคชัน GreenPass บนมือถือ (iOS & Android) เพื่อสแกน QR Code และเช็คอินสะสมแสตมป์อุทยานแห่งชาติ",
};

export default function StampPage() {
  const mobileFeatures = [
    {
      icon: "📸",
      title: "สแกน QR Code ด่านตรวจ",
      desc: "เปิดกล้องมือถือสแกนคิวอาร์โค้ดประจำจุดบริการและด่านตรวจของอุทยานเพื่อรับแสตมป์ทันที",
    },
    {
      icon: "📍",
      title: "ตรวจสอบตำแหน่งผ่าน GPS",
      desc: "ระบบตรวจจับพิกัดดาวเทียมเพื่อยืนยันว่าคุณเดินทางมาถึงอุทยานแห่งชาติจริง",
    },
    {
      icon: "📖",
      title: "สมุดพาสปอร์ตดิจิทัล",
      desc: "รวบรวมตราประทับอุทยานสวยงามครบทั้ง 155+ แห่ง บันทึกวันที่และเวลาเดินทางไว้อย่างปลอดภัย",
    },
    // {
    //   icon: "📶",
    //   title: "รองรับโหมดออฟไลน์",
    //   desc: "หมดกังวลเรื่องสัญญาณอินเทอร์เน็ตในป่าลึก แอปสามารถบันทึกและซิงค์ข้อมูลเมื่อกลับมามีสัญญาณ",
    // },
  ];

  return (
    <div className="mx-auto max-w-7xl pb-20">
      {/* Notice Banner: Separate Platform */}
      <div className="mb-8 rounded-2xl bg-amber-50 border border-amber-200/80 p-4.5 text-amber-900 shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 text-lg">
            📲
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-950">
              ข้อควรรู้: การเช็คอินสะสมแสตมป์ใช้งานผ่าน Mobile App เท่านั้น
            </h3>
            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed mt-0.5">
              เนื่องจากระบบต้องใช้กล้องมือถือในการสแกน QR Code และใช้เซนเซอร์ GPS ยืนยันพิกัด ณ อุทยานจริง ฟังก์ชันการเช็คอินจึงถูกออกแบบให้อยู่บน{" "}
              <strong>แอปพลิเคชันมือถือ GreenPass (คนละแพลตฟอร์มกับเว็บไซต์)</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3F6848] via-[#2F5237] to-[#1E3623] p-8 md:p-16 text-white shadow-xl mb-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-emerald-200">
              <span>🌿</span>
              <span>GreenPass Passport • ดิจิทัลพาสปอร์ตอุทยาน</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              สะสมแสตมป์อุทยาน <br />
              <span className="text-emerald-300">ผ่าน GreenPass Mobile App</span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-xl mx-auto lg:mx-0">
              พกพาสมุดพาสปอร์ตท่องเที่ยวอุทยานแห่งชาติไปได้ทุกที่บนสมาร์ตโฟนของคุณ สแกนเช็คอินเพื่อบันทึกประวัติการเดินทาง และสะสมให้ครบเพื่อแลกของรางวัลสุดพิเศษ
            </p>

            {/* Store Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              {/* App Store */}
              <div className="flex items-center gap-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md px-5 py-3 text-left transition-all cursor-pointer shadow-md">
                <span className="text-3xl">🍏</span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-emerald-200">Download on the</p>
                  <p className="text-sm font-bold text-white leading-tight">App Store (iOS)</p>
                </div>
              </div>

              {/* Google Play */}
              <div className="flex items-center gap-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md px-5 py-3 text-left transition-all cursor-pointer shadow-md">
                <span className="text-3xl">🤖</span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-emerald-200">GET IT ON</p>
                  <p className="text-sm font-bold text-white leading-tight">Google Play (Android)</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-emerald-200/80 pt-1">
              ✨ รองรับระบบปฏิบัติการ iOS 15+ และ Android 9.0+ ขึ้นไป
            </p>
          </div>

          {/* Visual Phone Mockup / Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 sm:w-72 rounded-[40px] border-4 border-white/30 bg-black/40 p-3 shadow-2xl backdrop-blur-md">
              <div className="overflow-hidden rounded-[32px] bg-[#FAFDF8] text-[#3F6848] p-5 shadow-inner">
                {/* Fake Phone Screen Header */}
                <div className="flex items-center justify-between border-b border-[#E3EBDD] pb-3 mb-4 text-xs font-bold">
                  <span>🍃 GreenPass App</span>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px]">
                    GPS Ready
                  </span>
                </div>

                {/* Passport Card Demo */}
                <div className="rounded-2xl bg-gradient-to-br from-[#3F6848] to-[#2F5237] p-4 text-white text-center shadow-md mb-4">
                  <span className="text-2xl mb-1 block">🏆</span>
                  <p className="text-[10px] uppercase tracking-wider text-emerald-300 font-semibold">
                    DIGITAL PASSPORT
                  </p>
                  <h4 className="text-base font-bold">สมุดสะสมแสตมป์ของฉัน</h4>
                  <p className="text-xs text-emerald-100 mt-1">สะสมแล้ว 5 / 155 แห่ง</p>
                </div>

                {/* Stamp Grid Demo */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="rounded-xl border border-[#D5E2CE] bg-[#F6FAF4] p-2.5">
                    <span className="text-xl block mb-1">🌲</span>
                    <p className="font-bold text-[11px] line-clamp-1">เขาใหญ่</p>
                    <span className="text-[9px] text-[#6B8E62]">เช็คอินแล้ว</span>
                  </div>
                  <div className="rounded-xl border border-[#D5E2CE] bg-[#F6FAF4] p-2.5">
                    <span className="text-xl block mb-1">⛰️</span>
                    <p className="font-bold text-[11px] line-clamp-1">ดอยอินทนนท์</p>
                    <span className="text-[9px] text-[#6B8E62]">เช็คอินแล้ว</span>
                  </div>
                </div>

                {/* Scan Button Demo */}
                <div className="mt-4 rounded-xl bg-[#6B8E62] py-2.5 text-center text-xs font-bold text-white shadow-xs">
                  📸 สแกนเช็คอินแสตมป์
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="mb-16">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B8E62]">MOBILE EXCLUSIVE</span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#3F6848]">
            ทำไมต้องเช็คอินผ่าน GreenPass Mobile App?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mobileFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-3xl border border-[#E3EBDD] bg-white p-6 shadow-xs hover:border-[#6B8E62]/40 hover:shadow-md transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F3E5] text-2xl mb-4">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-[#3F6848] mb-2">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6F756B] leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Step Tutorial */}
      <section className="mb-16 rounded-3xl border border-[#E3EBDD] bg-[#F6FAF4] p-8 md:p-12">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B8E62]">HOW TO STAMP</span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#3F6848]">
            3 ขั้นตอนสะสมแสตมป์ง่าย ๆ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white p-6 border border-[#E8F3E5] shadow-2xs">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F3E5] font-black text-[#3F6848] text-sm mb-3">
              1
            </span>
            <h4 className="text-base font-bold text-[#3F6848] mb-1.5">
              ติดตั้งแอปบนมือถือ
            </h4>
            <p className="text-xs text-[#6F756B] leading-relaxed">
              ดาวน์โหลด GreenPass บน App Store หรือ Google Play และลงทะเบียนบัญชีของคุณ
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-[#E8F3E5] shadow-2xs">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F3E5] font-black text-[#3F6848] text-sm mb-3">
              2
            </span>
            <h4 className="text-base font-bold text-[#3F6848] mb-1.5">
              ไปเที่ยวอุทยานจริง
            </h4>
            <p className="text-xs text-[#6F756B] leading-relaxed">
              เดินทางไปยังอุทยานแห่งชาติที่ร่วมรายการ ตรวจสอบจุดตรวจและศูนย์บริการนักท่องเที่ยว
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-[#E8F3E5] shadow-2xs">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F3E5] font-black text-[#3F6848] text-sm mb-3">
              3
            </span>
            <h4 className="text-base font-bold text-[#3F6848] mb-1.5">
              สแกนรับแสตมป์ทันที
            </h4>
            <p className="text-xs text-[#6F756B] leading-relaxed">
              เปิดแอป GreenPass สแกน QR Code ประจำจุดบริการ รับตราประทับและสะสมแต้มแลกของรางวัล
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Shortcuts */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-[#E3EBDD] bg-white p-6 md:p-8">
        <div>
          <h3 className="text-lg font-bold text-[#3F6848] mb-1">
            พร้อมวางแผนการเดินทางแล้วหรือยัง?
          </h3>
          <p className="text-xs sm:text-sm text-[#6F756B]">
            ตรวจสอบรายชื่ออุทยานแห่งชาติที่ร่วมรายการ หรือดูของรางวัลที่สามารถแลกได้
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/park"
            className="flex-1 sm:flex-initial rounded-xl bg-[#6B8E62] px-6 py-3 text-center text-xs font-semibold text-white shadow-xs hover:bg-[#5F7F58] transition-colors"
          >
            ค้นหาอุทยานแห่งชาติ →
          </Link>
          <Link
            href="/reward"
            className="flex-1 sm:flex-initial rounded-xl border border-[#D5E2CE] bg-white px-6 py-3 text-center text-xs font-semibold text-[#3F6848] hover:bg-[#F3F8F1] transition-colors"
          >
            ดูของรางวัล →
          </Link>
        </div>
      </section>
    </div>
  );
}
