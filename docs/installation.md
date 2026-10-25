# คู่มือการติดตั้ง GreenPass Web

เอกสารนี้อธิบายการเตรียมเครื่อง ติดตั้ง dependencies ตั้งค่า API เริ่มใช้งาน และสร้าง build สำหรับโปรเจกต์ GreenPass Web

## 1. ภาพรวมโปรเจกต์

โปรเจกต์นี้เป็นเว็บไซต์ frontend พัฒนาด้วย Next.js App Router, React และ TypeScript ใช้ Tailwind CSS สำหรับจัดรูปแบบหน้าเว็บ หน้าเว็บหลักมีดังนี้:

| URL | เนื้อหา |
| --- | --- |
| `/` | หน้าแรกและข้อมูลแนะนำ |
| `/park` | ค้นหาและดูรายละเอียดอุทยาน |
| `/announcement` | ข่าวและประกาศ |
| `/reward` | ข้อมูลของรางวัล |
| `/stamp` | ข้อมูลการสะสมแสตมป์ผ่านแอปมือถือ |

การสแกน QR Code เช็คอิน และสะสมแสตมป์เป็นความสามารถของ GreenPass Mobile App ไม่ใช่เว็บ frontend ใน repository นี้

## 2. สิ่งที่ต้องเตรียม

- **Node.js 20.9.0 ขึ้นไป** — Next.js รุ่นที่โปรเจกต์ใช้อยู่กำหนดเวอร์ชันขั้นต่ำนี้ แนะนำให้ติดตั้ง Node.js รุ่น LTS ที่ยังได้รับการสนับสนุน
- **npm** — ติดตั้งมาพร้อม Node.js
- **Git** — ใช้ดาวน์โหลด source code หากยังไม่มีสำเนาโปรเจกต์
- **เว็บเบราว์เซอร์สมัยใหม่** เช่น Chrome, Edge หรือ Firefox
- **อินเทอร์เน็ต** — ใช้ติดตั้งแพ็กเกจ และโหลดรูปภาพหรือข้อมูลทรัพยากรภายนอกที่หน้าเว็บอ้างอิง
- **Backend API (ถ้าต้องการข้อมูลจริง)** — ค่าเริ่มต้นของ frontend ชี้ไปที่ `http://localhost:8081/api/v1/` หากไม่มี backend บางหน้าจะแสดงข้อมูลตัวอย่างแทน

ตรวจสอบการติดตั้ง Node.js และ npm:

```bash
node --version
npm --version
```

หากใช้ PowerShell บน Windows และคำสั่ง `npm` ถูกบล็อกโดย Execution Policy ให้เรียก `npm.cmd` แทน เช่น `npm.cmd ci` และ `npm.cmd run dev` โดยไม่จำเป็นต้องเปลี่ยน policy ของเครื่อง

## 3. ดาวน์โหลด source code

หากยังไม่มี source code ให้ clone repository แล้วเข้าโฟลเดอร์โปรเจกต์:

```bash
git clone <repository-url>
cd github-greenpass-frontend
```

หากมีโฟลเดอร์โปรเจกต์อยู่แล้ว ให้เปิด Terminal ที่โฟลเดอร์ราก ซึ่งเป็นตำแหน่งเดียวกับ `package.json` และ `package-lock.json`

## 4. ติดตั้ง dependencies

ติดตั้งแพ็กเกจตามเวอร์ชันที่บันทึกไว้ใน lockfile:

```bash
npm ci
```

แนะนำให้ใช้ `npm ci` สำหรับการติดตั้งจาก repository เพราะจะยึด `package-lock.json` และได้ dependency ที่ตรงกับโปรเจกต์ หากโฟลเดอร์ `node_modules` ไม่มีหรือเสียหาย ให้รันคำสั่งนี้ซ้ำได้

อย่าแก้ไขหรือลบ `package-lock.json` เพื่อแก้ปัญหาการติดตั้งโดยไม่ตรวจสอบสาเหตุ เพราะไฟล์นี้ช่วยให้สมาชิกทีมติดตั้ง dependency ชุดเดียวกัน

## 5. ตั้งค่า Backend API (ถ้าต้องใช้)

โปรเจกต์ไม่จำเป็นต้องมีไฟล์ environment เพื่อเริ่มรัน ค่า API เริ่มต้นกำหนดไว้ใน `src/services/api.ts`:

```text
http://localhost:8081/api/v1/
```

หาก backend ใช้ URL อื่น ให้สร้างไฟล์ `.env.local` ที่โฟลเดอร์รากของโปรเจกต์ (ระดับเดียวกับ `package.json`) แล้วกำหนด:

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:8081/api/v1/
```

เปลี่ยน URL ให้ตรงกับ backend ของสภาพแวดล้อมที่ใช้งาน โดยคง `/` ปิดท้ายไว้ เพราะ frontend นำ URL นี้ไปต่อกับ path ของ API โดยตรง

ข้อควรทราบ:

- `NEXT_PUBLIC_API_BASE_URL` เป็นค่าที่ใช้ในโค้ดฝั่ง browser ได้ จึงไม่ควรใส่รหัสผ่าน token หรือ secret ในค่านี้
- Backend ต้องอนุญาต CORS จาก origin ของเว็บ เช่น `http://localhost:3000` มิฉะนั้น browser อาจบล็อกการเรียก API
- เมื่อตั้งค่า API ระหว่างพัฒนาแล้ว ให้หยุดและเริ่ม dev server ใหม่เพื่อให้โหลดค่า environment ใหม่
- สำหรับ production ให้ตั้งค่านี้ใน environment ของระบบ build ก่อนสั่ง build เนื่องจากค่า `NEXT_PUBLIC_*` ถูกนำไปใช้ใน client bundle และต้อง build ใหม่เมื่อเปลี่ยนค่า
- อย่า commit `.env.local` หรือไฟล์ที่มีค่าลับ ไฟล์ `.env*` ถูกระบุไว้ใน `.gitignore` แล้ว

## 6. เริ่มเว็บสำหรับพัฒนา

รันจากโฟลเดอร์ราก:

```bash
npm run dev
```

เมื่อ Terminal แจ้งว่าเซิร์ฟเวอร์พร้อมใช้งาน ให้เปิด:

```text
http://localhost:3000
```

หยุดเซิร์ฟเวอร์ด้วย `Ctrl+C` ใน Terminal ที่กำลังรันอยู่ หากพอร์ต 3000 ถูกใช้งาน Next.js อาจเลือกพอร์ตอื่น ให้ใช้ URL/พอร์ตที่แสดงใน Terminal

## 7. ตรวจสอบการทำงาน

ลองเปิดหน้าเว็บต่อไปนี้เพื่อยืนยันว่า routing ทำงาน:

- `http://localhost:3000/`
- `http://localhost:3000/park`
- `http://localhost:3000/announcement`
- `http://localhost:3000/reward`
- `http://localhost:3000/stamp`

หากยังไม่ได้เปิด backend ให้ตรวจว่าเว็บแสดงหน้าและข้อมูลตัวอย่างได้ตามปกติ หน้าค้นหาอุทยาน ประกาศ และของรางวัลมีข้อมูล fallback เมื่อเรียก API ไม่สำเร็จ การเห็นข้อมูลตัวอย่างไม่ได้ยืนยันว่าเชื่อมต่อ backend สำเร็จ

หากต้องตรวจโค้ด ให้รัน:

```bash
npm run lint
```

ใน `package.json` ปัจจุบันมี script สำหรับ `dev`, `build`, `start` และ `lint` แต่ไม่มี script สำหรับ test โดยเฉพาะ

## 8. สร้างและเปิดใช้งาน production build

ตั้งค่า `NEXT_PUBLIC_API_BASE_URL` ให้ถูกต้องก่อนเริ่ม build หากต้องการเชื่อม backend จากนั้นรัน:

```bash
npm run build
npm run start
```

เปิด URL ที่ Terminal แสดง (โดยปกติคือ `http://localhost:3000`) คำสั่ง `npm run start` ต้องใช้หลังจาก `npm run build` สำเร็จแล้ว และเป็นการเปิด build สำหรับ production ไม่ใช่เซิร์ฟเวอร์ hot reload สำหรับพัฒนา

## 9. โครงสร้างไฟล์ที่เกี่ยวข้อง

| ตำแหน่ง | หน้าที่ |
| --- | --- |
| `src/app/` | หน้าเว็บและ route ของ Next.js App Router |
| `src/components/` | ส่วนประกอบ UI แยกตามหน้า/ฟีเจอร์ |
| `src/services/` | การเรียก API และข้อมูล fallback |
| `src/types/` | TypeScript types สำหรับข้อมูล |
| `src/lib/` | helper ที่ใช้ร่วมกัน เช่น การจัดการ URL รูปภาพ |
| `public/` | ไฟล์ static ที่ให้บริการโดยเว็บ |
| `package.json` | dependencies และ scripts ของโปรเจกต์ |
| `package-lock.json` | เวอร์ชัน dependencies ที่ล็อกไว้ |
| `.env.local` | ค่าตั้งค่าเฉพาะเครื่อง (ผู้พัฒนาสร้างเอง ไม่ commit) |

## 10. แนวทางแก้ปัญหาเบื้องต้น

| อาการ | แนวทางตรวจสอบ |
| --- | --- |
| `npm ci` แจ้งว่าเวอร์ชัน Node.js ไม่รองรับ | ตรวจ `node --version` และติดตั้ง Node.js 20.9.0 ขึ้นไป จากนั้นเปิด Terminal ใหม่ |
| พอร์ต 3000 ถูกใช้งานแล้ว | ปิดโปรแกรมที่ใช้พอร์ต หรือใช้พอร์ตสำรองที่ Next.js แสดงใน Terminal |
| หน้าเว็บขึ้นข้อมูลตัวอย่างแทนข้อมูลจาก backend | ตรวจว่า backend ทำงานที่ URL ใน `NEXT_PUBLIC_API_BASE_URL` และตรวจ path API, CORS และ log ของ backend |
| แก้ `.env.local` แล้วค่า API ยังไม่เปลี่ยน | หยุดแล้วเริ่ม dev server ใหม่ หากเป็น production ให้ตั้งค่าก่อน build และสร้าง build ใหม่ |
| Browser แจ้ง CORS หรือเรียก API ไม่ได้ | ตรวจ URL ให้เข้าถึงได้จากเครื่องผู้ใช้ และตั้งค่า backend ให้อนุญาต origin ของ frontend |
| รูปภาพหรือทรัพยากรภายนอกไม่แสดง | ตรวจการเชื่อมต่ออินเทอร์เน็ตและ URL ของทรัพยากร |
| `npm` ใช้งานไม่ได้ใน PowerShell | ลองใช้ `npm.cmd` หรือเปิด Command Prompt แทน |
