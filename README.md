# Dawood Equipment Co. — Heavy Equipment Sales & Worldwide Export

A full-stack enterprise heavy machinery dealership platform featuring an **Express.js + Node.js** backend, **MongoDB** database, **JWT Authentication & Role-Based Authorization**, and a dedicated **Admin Operations Dashboard** with a responsive sidebar.

---

## 🚀 System Architecture

- **Backend**: Express.js, Node.js, Mongoose, JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), CORS.
- **Database**: MongoDB (`mongodb://127.0.0.1:27017/dawood_equipment`).
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons.
- **Portals**:
  - **Public / Client Portal**: Machinery catalog, freight cost estimator, RFQ pro-forma booking, surplus machine sell-back.
  - **Admin Dealership Operations Console**: Isolated sidebar dashboard with full CRUD powers.

---

## 🔐 Seeded Accounts (Automatic on Startup)

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Dealership Admin** | `admin@dawoodequipment.com` | `admin123` | Full Dealership Management (Sidebar Dashboard) |
| **Operations Admin** | `operations@dawoodequipment.com` | `admin123` | Full Dealership Management |
| **Verified Buyer** | `alex.miller@apexconstruction.com` | `client123` | Client Inquiries, Tracking & Pro-Forma Orders |

---

## 🛠️ Admin Dashboard Capabilities (All Powers)

1. **📊 Executive Overview & Analytics**: Live KPIs, total units, available vs. sold count, active inquiries, transit shipments, fleet valuation ($USD), MongoDB connection status.
2. **🚜 Fleet & Machinery Inventory Manager**:
   - Add new machinery (title, specs, pricing, photo URL, VIN, hours, category).
   - Edit equipment specifications, pricing, and description.
   - **1-Click Toggle SOLD / AVAILABLE** (instantly updates live public catalog).
   - Permanently delete machinery units.
3. **📩 Buyer Inquiries & Export RFQs**:
   - Inspect buyer contact details, equipment requested, and destination port.
   - Update workflow status: `Pending RFQ` → `Quoted` → `Deposit Paid` → `Dispatched` → `Delivered`.
   - Record internal dealership broker notes and custom quote amounts.
4. **🚢 Ocean Freight & Logistics Dispatch**:
   - Track container numbers, vessel names, ocean carriers (Maersk, MSC, Hapag-Lloyd).
   - Update milestones: Yard Prep → Trucking to Port → Teardown/Containerizing → Vessel Transit → Customs → Delivered.
5. **💼 Equipment Buyout Appraisals**:
   - Review contractor-submitted machines.
   - Submit counter buyout offers ($USD) and schedule physical yard inspections.
6. **👥 User & Client Directory**:
   - View all registered users in MongoDB.
   - Promote/Demote roles between `buyer` and `admin`.
   - Suspend or activate user accounts.
7. **⚙️ Database & Seed Tools**:
   - 1-Click MongoDB re-seeding and system diagnostics.

---

## 💻 How to Run Locally

### 1. Start MongoDB
Ensure MongoDB is running locally on port `27017` (default service).

### 2. Start Both Backend & Frontend
```bash
npm run dev
```
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:3000`

### 3. Dedicated Scripts
- Run Backend only: `npm run dev:server`
- Run Frontend only: `npm run dev:client`
- Re-seed Database: `npm run seed`
