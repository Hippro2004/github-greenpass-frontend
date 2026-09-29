/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Home() {
  const featuredParks = [
    {
      id: 1,
      name: "อุทยานแห่งชาติเขาใหญ่",
      province: "นครราชสีมา",
      image: "https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=800&q=80",
      hours: "06:00 - 18:00 น.",
      highlight: "มรดกโลกทางธรรมชาติ UNESCO ดงพญาเย็น-เขาใหญ่"
    },
    {
      id: 5,
      name: "อุทยานแห่งชาติดอยอินทนนท์",
      province: "เชียงใหม่",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      hours: "05:00 - 18:00 น.",
      highlight: "หลังคาแห่งสยาม ยอดเขาสูงที่สุดในประเทศไทย 2,565 ม."
    },
    {
      id: 3,
      name: "อุทยานแห่งชาติเอราวัณ",
      province: "กาญจนบุรี",
      image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
      hours: "08:00 - 16:30 น.",
      highlight: "น้ำตกมรกต 7 ชั้นงดงามดั่งสวรรค์กลางป่าเขา"
    }
  ];

  const steps = [
    {
      num: "01",
      title: "ค้นหาอุทยาน",
      desc: "เลือกจุดหมายปลายทาง เช็คเวลาเปิดทำการ และพิกัดแผนที่การเดินทาง",
      icon: "🧭"
    },
    {
      num: "02",
      title: "ออกสำรวจธรรมชาติ",
      desc: "สัมผัสอากาศบริสุทธิ์ ผืนป่า ลำธาร และสัตว์ป่านานาชนิด",
      icon: "🌲"
    },
    {
      num: "03",
      title: "เช็คอินบน GreenPass App",
      desc: "เปิดแอปมือถือสแกน QR Code และยืนยันพิกัด ณ อุทยาน (ใช้งานผ่าน Mobile App)",
      icon: "📱"
    },
    {
      num: "04",
      title: "แลกรับของรางวัล",
      desc: "สะสมครบตามเงื่อนไข นำมาแลกรับเข็มกลัดและของที่ระลึกรุ่นพิเศษ",
      icon: "🎁"
    }
  ];

  return (
    <div className="mx-auto max-w-7xl pb-20">
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 text-center">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[650px] rounded-full bg-[#00A86B]/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#D1FAE5] border border-[#D6EFE2] px-4 py-2 text-xs md:text-sm font-semibold text-[#064E3B] shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-[#00A86B] animate-pulse" />
            <span>GreenPass • แพลตฟอร์มอุทยานแห่งชาติดิจิทัลแห่งแรกของไทย</span>
          </div>

          <h1 className="mb-6 max-w-4xl text-4xl font-extrabold tracking-tight text-[#064E3B] sm:text-6xl md:text-7xl leading-[1.15]">
            Explore the Nature. <br />
            <span className="text-[#00A86B]">Preserve the Wonder.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-base sm:text-lg leading-relaxed text-[#64748B]">
            ออกเดินทางสำรวจอุทยานแห่งชาติทั่วประเทศไทย เช็คสถานะเวลาเปิด-ปิดแบบเรียลไทม์
            ติดตามประกาศด่วนสภาพอากาศ และสะสมแสตมป์เพื่อแลกของที่ระลึกสุดเอ็กซ์คลูซีฟ
          </p>

          {/* <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none">
            <Link
              href="/park"
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#064E3B] to-[#0F5A3E] px-8 py-3.5 font-semibold text-white shadow-md shadow-[#064E3B]/20 transition-all hover:from-[#043327] hover:to-[#0A3D2A] hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span>🌲 ค้นหาอุทยานแห่งชาติ</span>
            </Link>

            <Link
              href="/announcement"
              className="flex items-center justify-center gap-2 rounded-full border border-[#D6EFE2] bg-white px-7 py-3.5 font-semibold text-[#064E3B] shadow-2xs transition-all hover:bg-[#E8F7F0] hover:border-[#00A86B] hover:-translate-y-0.5"
            >
              <span>📢 ประกาศและข่าวสาร</span>
            </Link>

            <Link
              href="/reward"
              className="flex items-center justify-center gap-2 rounded-full border border-[#D6EFE2] bg-[#E8F7F0] px-7 py-3.5 font-semibold text-[#065F46] transition-all hover:bg-[#D1FAE5] hover:text-[#064E3B] hover:-translate-y-0.5"
            >
              <span>🎁 ดูของรางวัล</span>
            </Link>
          </div> */}

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 max-w-3xl w-full border-t border-[#D6EFE2] pt-8 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#064E3B]">155+</p>
              <p className="text-xs sm:text-sm text-[#64748B]">อุทยานแห่งชาติทั่วไทย</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#064E3B]">100%</p>
              <p className="text-xs sm:text-sm text-[#64748B]">ข้อมูลอัปเดตแบบเรียลไทม์</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#00A86B]">Online</p>
              <p className="text-xs sm:text-sm text-[#64748B]">สะสมแสตมป์ดิจิทัล</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A86B]">SERVICES & HIGHLIGHTS</span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#064E3B]">
            ทุกสิ่งที่คุณต้องการในหนึ่งเดียว
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/park"
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#D6EFE2] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#00A86B]/50 hover:shadow-xl hover:shadow-[#00A86B]/10"
          >
            <div>
              <div className="relative mb-5 h-44 w-full overflow-hidden rounded-2xl bg-[#E8F7F0]">
                <img
                  src="https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=800&q=80"
                  alt="ค้นหาอุทยานแห่งชาติ"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#064E3B] shadow-2xs">
                  อุทยานแห่งชาติ
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#064E3B] mb-2 group-hover:text-[#00A86B] transition-colors">
                ค้นหาและวางแผนเที่ยวอุทยาน
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                เช็คเวลาเปิด-ปิดทำการ พิกัดนำทาง Google Maps ประกาศด่านตรวจ และข้อมูลธรรมชาติอย่างละเอียด
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#00A86B] group-hover:translate-x-1 transition-transform">
              <span>เริ่มค้นหาอุทยาน</span>
              <span>→</span>
            </div>
          </Link>

          <Link
            href="/announcement"
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#D6EFE2] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#00A86B]/50 hover:shadow-xl hover:shadow-[#00A86B]/10"
          >
            <div>
              <div className="relative mb-5 h-44 w-full overflow-hidden rounded-2xl bg-[#E8F7F0]">
                <img
                  src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80"
                  alt="ข่าวสารและประกาศ"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-full bg-rose-500 text-white backdrop-blur-md px-3 py-1 text-xs font-bold">
                  อัปเดตเรียลไทม์
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#064E3B] mb-2 group-hover:text-[#00A86B] transition-colors">
                ประกาศเตือนภัยและข่าวสาร
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                รู้ทันสถานการณ์น้ำป่า หมอกหนา การปิดซ่อมแซมเส้นทางท่องเที่ยว และคำแนะนำจากเจ้าหน้าที่พิทักษ์ป่า
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#00A86B] group-hover:translate-x-1 transition-transform">
              <span>อ่านประกาศล่าสุด</span>
              <span>→</span>
            </div>
          </Link>

          <Link
            href="/reward"
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#D6EFE2] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#00A86B]/50 hover:shadow-xl hover:shadow-[#00A86B]/10"
          >
            <div>
              <div className="relative mb-5 h-44 w-full overflow-hidden rounded-2xl bg-[#E8F7F0]">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                  alt="ของรางวัลและของที่ระลึก"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-full bg-amber-500 text-white backdrop-blur-md px-3 py-1 text-xs font-bold">
                  ของที่ระลึกพิเศษ
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#064E3B] mb-2 group-hover:text-[#00A86B] transition-colors">
                สะสมแสตมป์ แลกของรางวัล
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                เปลี่ยนความทรงจำการเดินทางเป็นของที่ระลึกรุ่นพิเศษ เช่น เข็มกลัดทองเหลือง กระเป๋าผ้า และหมวกเดินป่า
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#00A86B] group-hover:translate-x-1 transition-transform">
              <span>ดูของรางวัลทั้งหมด</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="mb-20">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00A86B]">TOP DESTINATIONS</span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#064E3B]">
              อุทยานแห่งชาติยอดนิยม
            </h2>
          </div>
          <Link
            href="/park"
            className="text-xs sm:text-sm font-semibold text-[#00A86B] hover:text-[#064E3B] transition-colors flex items-center gap-1"
          >
            <span>ดูอุทยานทั้งหมด</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredParks.map((park) => (
            <Link
              key={park.id}
              href="/park"
              className="group relative overflow-hidden rounded-3xl border border-[#D6EFE2] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={park.image}
                  alt={park.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#064E3B]">
                  {park.province}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs text-emerald-300 font-medium">{park.hours}</p>
                  <h3 className="text-lg font-bold leading-tight drop-shadow-sm mb-1">
                    {park.name}
                  </h3>
                  <p className="text-xs text-zinc-200 line-clamp-1">
                    {park.highlight}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-20 rounded-3xl border border-[#D6EFE2] bg-[#E8F7F0]/40 p-8 md:p-12">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A86B]">HOW IT WORKS</span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#064E3B]">
            เริ่มใช้งาน GreenPass ง่าย ๆ ใน 4 ขั้นตอน
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex flex-col rounded-2xl bg-white p-6 border border-[#D6EFE2] shadow-2xs"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{step.icon}</span>
                <span className="text-xs font-black text-[#064E3B] bg-[#D1FAE5] px-2.5 py-1 rounded-full font-mono">
                  {step.num}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#064E3B] mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#0F5A3E] to-[#043327] p-10 md:p-16 text-center text-white shadow-xl">
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <span className="text-3xl mb-3">🍃</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            พร้อมออกเดินทางไปกับธรรมชาติแล้วหรือยัง?
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed mb-8">
            เริ่มต้นค้นหาอุทยานแห่งชาติใกล้คุณ เช็คประกาศ และเตรียมตัวสัมผัสประสบการณ์ท่องเที่ยวธรรมชาติอันแสนประทับใจ
          </p>

          <Link
            href="/park"
            className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#064E3B] shadow-lg transition-all hover:bg-emerald-50 hover:scale-105"
          >
            ค้นหาอุทยานแห่งชาติทันที →
          </Link>
        </div>
      </section>
    </div>
  );
}