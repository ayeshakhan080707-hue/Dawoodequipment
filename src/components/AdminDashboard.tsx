import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Truck, 
  Anchor, 
  DollarSign, 
  Search, 
  Filter, 
  Trash2, 
  ShieldCheck, 
  LogOut, 
  ArrowUpRight, 
  AlertCircle,
  FileText,
  Phone,
  Mail,
  Box,
  Eye,
  RefreshCw,
  Users,
  Database,
  BarChart3,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Package,
  Globe2,
  Check,
  X,
  SlidersHorizontal,
  FolderSync,
  Image as ImageIcon,
  Video,
  Film,
  Upload,
  Loader2,
  Tags,
  Bookmark
} from 'lucide-react';
import { useAuth, API_URL, UserRecord } from '../context/AuthContext';
import dawoodLogo from '../assets/images/ea89d751-72fc-4744-bb51-a5f7bae6c659.png';
import { Equipment, EquipmentCategory, MachineryVendor, Manufacturer, CategoryItem } from '../types/equipment';
import { BuyerInquiry, SellOfferSubmission, InquiryStatus, ShipmentTrackingRecord } from '../types/auth';

interface AdminDashboardProps {
  onNavigateHome: () => void;
  onInspectMachine: (machine: Equipment) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateHome,
  onInspectMachine
}) => {
  const { 
    currentUser, 
    logout, 
    fleet, 
    refreshFleet,
    updateMachine, 
    addMachine, 
    deleteMachine,
    toggleSoldStatus,
    inquiries,
    refreshInquiries,
    updateInquiryStatus,
    deleteInquiry,
    shipments,
    refreshShipments,
    updateShipmentStatus,
    addShipment,
    deleteShipment,
    sellOffers,
    refreshSellOffers,
    updateSellOfferStatus,
    deleteSellOffer,
    users,
    fetchUsers,
    createUser,
    updateUserRole,
    updateUserStatus,
    manufacturers,
    categories,
    refreshTaxonomy,
    addManufacturer,
    updateManufacturer,
    deleteManufacturer,
    addCategory,
    updateCategory,
    deleteCategory,
    reseedDatabase
  } = useAuth();

  // Active navigation section
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'add-machine' | 'leads' | 'logistics' | 'buyouts' | 'users' | 'taxonomy'>('overview');
  
  // Inventory filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVendor, setFilterVendor] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Modals
  const [editingMachine, setEditingMachine] = useState<Equipment | null>(null);
  const [selectedInquiryForEdit, setSelectedInquiryForEdit] = useState<BuyerInquiry | null>(null);
  const [inquiryNotesInput, setInquiryNotesInput] = useState('');
  const [inquiryPriceInput, setInquiryPriceInput] = useState<number>(0);
  const [inquiryStatusInput, setInquiryStatusInput] = useState<InquiryStatus>('pending');
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [isReseeding, setIsReseeding] = useState(false);

  // Counter-offer modal state
  const [counterOfferModalOpen, setCounterOfferModalOpen] = useState(false);
  const [counterOfferTarget, setCounterOfferTarget] = useState<{ id: string; askingPrice: number } | null>(null);
  const [counterOfferValue, setCounterOfferValue] = useState('');
  const [counterOfferError, setCounterOfferError] = useState('');

  // Delete confirmation modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'machine' | 'inquiry' | 'shipment' | 'offer' | 'manufacturer' | 'category'; id: string; label: string } | null>(null);

  // Taxonomy management state
  const [taxonomyTab, setTaxonomyTab] = useState<'manufacturers' | 'categories'>('manufacturers');
  const [taxonomySearch, setTaxonomySearch] = useState('');
  
  // Manufacturer modal state
  const [isMfrModalOpen, setIsMfrModalOpen] = useState(false);
  const [editingMfr, setEditingMfr] = useState<Manufacturer | null>(null);
  const [mfrName, setMfrName] = useState('');
  const [mfrSlug, setMfrSlug] = useState('');
  const [mfrCountry, setMfrCountry] = useState('United States');
  const [mfrDescription, setMfrDescription] = useState('');
  const [isSavingMfr, setIsSavingMfr] = useState(false);

  // Category modal state
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryItem | null>(null);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [isSavingCat, setIsSavingCat] = useState(false);

  // Add User modal state
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserCompany, setNewUserCompany] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserCountry, setNewUserCountry] = useState('United States');
  const [newUserRole, setNewUserRole] = useState<'buyer' | 'admin'>('buyer');
  const [newUserError, setNewUserError] = useState('');

  // New machine form state
  const [newTitle, setNewTitle] = useState('');
  const [newVendor, setNewVendor] = useState<MachineryVendor>('CATERPILLAR');
  const [newModel, setNewModel] = useState('');
  const [newCategory, setNewCategory] = useState<EquipmentCategory>('Excavators');
  const [newPrice, setNewPrice] = useState<number>(145000);
  const [newPriceDisplay, setNewPriceDisplay] = useState('Call for Price');
  const [newYear, setNewYear] = useState(2021);
  const [newHours, setNewHours] = useState(3200);
  const [newStock, setNewStock] = useState(`DEQ-CAT-${Math.floor(100 + Math.random() * 900)}`);
  const [newSerial, setNewSerial] = useState('VIN-US-2026-');
  const [newLocation, setNewLocation] = useState('Chicago Yard, Illinois');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80');
  const [newGalleryImages, setNewGalleryImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1000&q=80'
  ]);
  const [newVideoUrl, setNewVideoUrl] = useState('https://assets.mixkit.co/videos/preview/mixkit-excavator-working-on-a-construction-site-41619-large.mp4');
  const [newVideoTitle, setNewVideoTitle] = useState('Dawood Inspection Walkaround & Cold Start');
  const [newVideoDuration, setNewVideoDuration] = useState('3:20 min');

  // File Upload states
  const [isUploadingPrimary, setIsUploadingPrimary] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isUploadingEditPrimary, setIsUploadingEditPrimary] = useState(false);
  const [isUploadingEditGallery, setIsUploadingEditGallery] = useState(false);
  const [isUploadingEditVideo, setIsUploadingEditVideo] = useState(false);
  const [newEngineModel, setNewEngineModel] = useState('Cat C9.3 ACERT');
  const [newHp, setNewHp] = useState(225);
  const [newWeightTons, setNewWeightTons] = useState(24.5);
  const [newDescription, setNewDescription] = useState('Jobsite-ready machine with full service records, EPA Tier 4 Final certification, and export clearance documentation.');

  // New Shipment form state
  const [newShipmentMachineTitle, setNewShipmentMachineTitle] = useState('');
  const [newShipmentBuyerName, setNewShipmentBuyerName] = useState('');
  const [newShipmentDestination, setNewShipmentDestination] = useState('Jebel Ali / Dubai, UAE');
  const [newShipmentCarrier, setNewShipmentCarrier] = useState('Maersk Line');
  const [newShipmentTracking, setNewShipmentTracking] = useState(`MAE-${Math.floor(1000000 + Math.random() * 9000000)}`);

  // Feedback notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Stats computation
  const totalUnits = fleet.length;
  const soldUnits = fleet.filter(m => Boolean(m.isSold)).length;
  const availableUnits = totalUnits - soldUnits;
  const pendingLeads = inquiries.filter(i => i.status === 'pending').length;
  const pendingOffers = sellOffers.filter(o => o.status === 'under_review').length;
  const activeShipments = shipments.filter(s => s.status !== 'delivered').length;
  const totalFleetValue = fleet.reduce((sum, m) => sum + (m.numericPrice || 0), 0);

  // Filtered inventory
  const filteredFleet = fleet.filter(m => {
    const title = m.title || m.name || '';
    const model = m.model || '';
    const stock = m.stockNumber || '';
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          stock.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVendor = filterVendor === 'all' || m.vendor === filterVendor;
    const matchesCategory = filterCategory === 'all' || m.category === filterCategory || m.productType === filterCategory;
    const isSold = Boolean(m.isSold);
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'available' && !isSold) ||
      (filterStatus === 'sold' && isSold);
    return matchesSearch && matchesVendor && matchesCategory && matchesStatus;
  });

  // Filtered taxonomy
  const filteredMfrs = manufacturers.filter(m => {
    if (!taxonomySearch.trim()) return true;
    const q = taxonomySearch.toLowerCase();
    return (
      (m.name || '').toLowerCase().includes(q) ||
      (m.slug || '').toLowerCase().includes(q) ||
      (m.country || '').toLowerCase().includes(q) ||
      (m.description || '').toLowerCase().includes(q)
    );
  });

  const filteredCats = categories.filter(c => {
    if (!taxonomySearch.trim()) return true;
    const q = taxonomySearch.toLowerCase();
    return (
      (c.name || '').toLowerCase().includes(q) ||
      (c.slug || '').toLowerCase().includes(q) ||
      (c.description || '').toLowerCase().includes(q)
    );
  });

  // Handle Add Machine
  const handleAddNewMachineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const validGallery = newGalleryImages.map(s => s.trim()).filter(s => s.length > 0);
    const allImages = [newImageUrl.trim(), ...validGallery.filter(s => s !== newImageUrl.trim())];

    const success = await addMachine({
      title: newTitle.trim(),
      name: newTitle.trim(),
      vendor: newVendor,
      manufacturer: newVendor,
      model: newModel.trim() || newTitle.trim(),
      category: newCategory,
      productType: newCategory,
      categoryLabel: `${newVendor} ${newCategory}`,
      year: Number(newYear),
      hours: Number(newHours),
      stockNumber: newStock.trim() || `DEQ-${Date.now()}`,
      numericPrice: Number(newPrice),
      priceDisplay: newPriceDisplay || `$${Number(newPrice).toLocaleString()}`,
      image: newImageUrl.trim(),
      mainImage: newImageUrl.trim(),
      images: allImages,
      additionalImages: validGallery,
      videoUrl: newVideoUrl.trim() || 'https://assets.mixkit.co/videos/preview/mixkit-excavator-working-on-a-construction-site-41619-large.mp4',
      videoTitle: newVideoTitle.trim() || `${newTitle} Inspection Walkaround`,
      videoDuration: newVideoDuration.trim() || '3:20 min',
      isSold: false,
      specs: {
        engineModel: newEngineModel,
        flywheelPowerHP: Number(newHp),
        operatingWeightTons: Number(newWeightTons),
        hours: Number(newHours),
        serialVin: newSerial,
        location: newLocation,
        condition: 'Jobsite Ready / Tier 4 Final'
      },
      description: newDescription,
      features: ['EPA Tier 4 Final Certified', 'Full Service Records', 'Ready for Export / Containerizing', 'Clean Hydraulics Test']
    });

    if (success) {
      showToast('Machine successfully added with multi-image gallery & video walkaround!');
      setActiveTab('inventory');
      // Reset form
      setNewTitle('');
      setNewModel('');
      setNewStock(`DEQ-CAT-${Math.floor(100 + Math.random() * 900)}`);
    } else {
      showToast('Failed to add machine. Please check network/server.');
    }
  };

  // Handle Edit Machine
  const handleEditMachineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMachine) return;

    const primary = editingMachine.image || (editingMachine.images && editingMachine.images[0]) || '';
    const imgs = (editingMachine.images && editingMachine.images.length > 0)
      ? editingMachine.images
      : [primary];

    const machineToSave: Equipment = {
      ...editingMachine,
      image: primary,
      mainImage: primary,
      images: imgs,
      videoUrl: editingMachine.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-excavator-working-on-a-construction-site-41619-large.mp4',
      videoTitle: editingMachine.videoTitle || 'Inspection Walkaround',
      videoDuration: editingMachine.videoDuration || '3:20 min'
    };

    const success = await updateMachine(machineToSave);
    if (success) {
      showToast('Machine specifications & media updated in MongoDB!');
      setEditingMachine(null);
    } else {
      showToast('Failed to update machine.');
    }
  };

  // ===================== FILE UPLOAD HANDLERS =====================
  const handlePrimaryFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingPrimary(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API_URL}/upload/image`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        setNewImageUrl(data.url);
        showToast('Cover photo uploaded successfully!');
      } else {
        showToast(data.message || 'Failed to upload photo.');
      }
    } catch {
      showToast('Error uploading photo to server.');
    } finally {
      setIsUploadingPrimary(false);
      e.target.value = '';
    }
  };

  const handleGalleryFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingGallery(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach(f => formData.append('images', f));
      const res = await fetch(`${API_URL}/upload/images`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.urls)) {
        setNewGalleryImages(prev => [...prev, ...data.urls]);
        showToast(`${data.urls.length} gallery photos uploaded successfully!`);
      } else {
        showToast(data.message || 'Failed to upload gallery photos.');
      }
    } catch {
      showToast('Error uploading gallery photos.');
    } finally {
      setIsUploadingGallery(false);
      e.target.value = '';
    }
  };

  const handleVideoFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingVideo(true);
    try {
      const formData = new FormData();
      formData.append('video', file);
      const res = await fetch(`${API_URL}/upload/video`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        setNewVideoUrl(data.url);
        showToast('Walkaround video uploaded successfully!');
      } else {
        showToast(data.message || 'Failed to upload video.');
      }
    } catch {
      showToast('Error uploading video to server.');
    } finally {
      setIsUploadingVideo(false);
      e.target.value = '';
    }
  };

  const handleEditPrimaryFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingMachine) return;
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingEditPrimary(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API_URL}/upload/image`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        const existingImgs = editingMachine.images || [];
        const nextImgs = existingImgs.length > 0 ? [data.url, ...existingImgs.slice(1)] : [data.url];
        setEditingMachine({
          ...editingMachine,
          image: data.url,
          mainImage: data.url,
          images: nextImgs
        });
        showToast('Cover photo uploaded!');
      } else {
        showToast(data.message || 'Upload failed.');
      }
    } catch {
      showToast('Error uploading cover photo.');
    } finally {
      setIsUploadingEditPrimary(false);
      e.target.value = '';
    }
  };

  const handleEditGalleryFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingMachine) return;
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingEditGallery(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach(f => formData.append('images', f));
      const res = await fetch(`${API_URL}/upload/images`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.urls)) {
        const currentImgs = editingMachine.images || [editingMachine.image];
        setEditingMachine({
          ...editingMachine,
          images: [...currentImgs, ...data.urls]
        });
        showToast(`${data.urls.length} gallery photos added!`);
      } else {
        showToast(data.message || 'Upload failed.');
      }
    } catch {
      showToast('Error uploading gallery photos.');
    } finally {
      setIsUploadingEditGallery(false);
      e.target.value = '';
    }
  };

  const handleEditVideoFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingMachine) return;
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingEditVideo(true);
    try {
      const formData = new FormData();
      formData.append('video', file);
      const res = await fetch(`${API_URL}/upload/video`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        setEditingMachine({
          ...editingMachine,
          videoUrl: data.url
        });
        showToast('Walkaround video uploaded!');
      } else {
        showToast(data.message || 'Upload failed.');
      }
    } catch {
      showToast('Error uploading video.');
    } finally {
      setIsUploadingEditVideo(false);
      e.target.value = '';
    }
  };

  // Handle Toggle Sold
  const handleToggleSold = async (id: string, title: string) => {
    const success = await toggleSoldStatus(id);
    if (success) {
      showToast(`Status updated for "${title}"`);
    }
  };

  // Handle Delete Machine — open confirm modal
  const handleDeleteMachine = (id: string, title: string) => {
    setDeleteTarget({ type: 'machine', id, label: title });
    setDeleteModalOpen(true);
  };

  // Handle Inquiry Update
  const handleOpenEditInquiry = (inq: BuyerInquiry) => {
    setSelectedInquiryForEdit(inq);
    setInquiryStatusInput(inq.status);
    setInquiryNotesInput(inq.brokerNotes || '');
    setInquiryPriceInput(inq.priceQuoted || inq.totalEstimatedAmount || 0);
  };

  const handleSaveInquiry = async () => {
    if (!selectedInquiryForEdit) return;
    const success = await updateInquiryStatus(
      selectedInquiryForEdit.id,
      inquiryStatusInput,
      inquiryNotesInput,
      inquiryPriceInput
    );
    if (success) {
      showToast('Inquiry & broker notes updated in database.');
      setSelectedInquiryForEdit(null);
    }
  };

  // Handle Dispatch Shipment
  const handleCreateShipmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addShipment({
      machineTitle: newShipmentMachineTitle || 'Heavy Equipment Machine',
      buyerName: newShipmentBuyerName || 'Global Buyer',
      destinationPort: newShipmentDestination,
      carrierName: newShipmentCarrier,
      trackingNumber: newShipmentTracking,
      status: 'yard_prep',
      progressPercent: 15,
      currentMilestone: 'Yard Preparation & Component Teardown at Chicago Logistics Hub'
    });
    if (success) {
      showToast('Ocean freight container shipment dispatched & recorded.');
      setIsDispatchModalOpen(false);
      setNewShipmentMachineTitle('');
      setNewShipmentBuyerName('');
    }
  };

  // Handle Reseed Database
  const handleReseed = async () => {
    setIsReseeding(true);
    const success = await reseedDatabase();
    setIsReseeding(false);
    if (success) {
      showToast('Database successfully re-seeded with all original datasets!');
    } else {
      showToast('Reseed failed.');
    }
  };

  // Handle Delete Modal Confirm
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteModalOpen(false);
    let success = false;
    if (deleteTarget.type === 'machine') success = await deleteMachine(deleteTarget.id);
    else if (deleteTarget.type === 'inquiry') success = await deleteInquiry(deleteTarget.id);
    else if (deleteTarget.type === 'shipment') success = await deleteShipment(deleteTarget.id);
    else if (deleteTarget.type === 'offer') success = await deleteSellOffer(deleteTarget.id);
    else if (deleteTarget.type === 'manufacturer') {
      const res = await deleteManufacturer(deleteTarget.id);
      success = res.success;
    } else if (deleteTarget.type === 'category') {
      const res = await deleteCategory(deleteTarget.id);
      success = res.success;
    }
    if (success) showToast(`"${deleteTarget.label}" deleted successfully.`);
    setDeleteTarget(null);
  };

  // Handle Counter Offer Submit
  const handleCounterOfferSubmit = async () => {
    const price = Number(counterOfferValue);
    if (!counterOfferTarget || isNaN(price) || price <= 0) {
      setCounterOfferError('Please enter a valid offer amount in USD.');
      return;
    }
    await updateSellOfferStatus(counterOfferTarget.id, 'offer_sent', price);
    showToast(`Counter offer of $${price.toLocaleString()} sent.`);
    setCounterOfferModalOpen(false);
    setCounterOfferTarget(null);
    setCounterOfferValue('');
    setCounterOfferError('');
  };

  // Handle Add User Submit
  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewUserError('');
    if (!newUserName || !newUserEmail || !newUserPassword) {
      setNewUserError('Name, email and password are required.');
      return;
    }
    const result = await createUser({
      name: newUserName, email: newUserEmail, password: newUserPassword,
      company: newUserCompany, phone: newUserPhone, country: newUserCountry,
      role: newUserRole
    });
    if (result.success) {
      showToast(result.message || 'User created successfully!');
      setIsAddUserModalOpen(false);
      setNewUserName(''); setNewUserEmail(''); setNewUserPassword('');
      setNewUserCompany(''); setNewUserPhone(''); setNewUserCountry('United States');
      setNewUserRole('buyer'); setNewUserError('');
    } else {
      setNewUserError(result.message || 'Failed to create user.');
    }
  };

  // Taxonomy helper handlers
  const handleOpenAddMfr = () => {
    setEditingMfr(null);
    setMfrName('');
    setMfrSlug('');
    setMfrCountry('United States');
    setMfrDescription('');
    setIsMfrModalOpen(true);
  };

  const handleOpenEditMfr = (m: Manufacturer) => {
    setEditingMfr(m);
    setMfrName(m.name);
    setMfrSlug(m.slug || m.name);
    setMfrCountry(m.country || 'Global');
    setMfrDescription(m.description || '');
    setIsMfrModalOpen(true);
  };

  const handleSaveMfr = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfrName.trim()) return;
    setIsSavingMfr(true);
    if (editingMfr) {
      const id = editingMfr._id || editingMfr.id || '';
      const res = await updateManufacturer(id, {
        name: mfrName.trim(),
        slug: (mfrSlug.trim() || mfrName.trim()).toUpperCase(),
        country: mfrCountry.trim(),
        description: mfrDescription.trim()
      });
      setIsSavingMfr(false);
      if (res.success) {
        showToast(`Manufacturer "${mfrName}" updated.`);
        setIsMfrModalOpen(false);
      } else {
        showToast(res.message || 'Failed to update manufacturer');
      }
    } else {
      const res = await addManufacturer({
        name: mfrName.trim(),
        slug: (mfrSlug.trim() || mfrName.trim()).toUpperCase(),
        country: mfrCountry.trim(),
        description: mfrDescription.trim()
      });
      setIsSavingMfr(false);
      if (res.success) {
        showToast(`Manufacturer "${mfrName}" added successfully.`);
        setIsMfrModalOpen(false);
      } else {
        showToast(res.message || 'Failed to add manufacturer');
      }
    }
  };

  const handleOpenAddCat = () => {
    setEditingCat(null);
    setCatName('');
    setCatSlug('');
    setCatDescription('');
    setIsCatModalOpen(true);
  };

  const handleOpenEditCat = (c: CategoryItem) => {
    setEditingCat(c);
    setCatName(c.name);
    setCatSlug(c.slug || c.name);
    setCatDescription(c.description || '');
    setIsCatModalOpen(true);
  };

  const handleSaveCat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    setIsSavingCat(true);
    if (editingCat) {
      const id = editingCat._id || editingCat.id || '';
      const res = await updateCategory(id, {
        name: catName.trim(),
        slug: catSlug.trim() || catName.trim(),
        description: catDescription.trim()
      });
      setIsSavingCat(false);
      if (res.success) {
        showToast(`Category "${catName}" updated.`);
        setIsCatModalOpen(false);
      } else {
        showToast(res.message || 'Failed to update category');
      }
    } else {
      const res = await addCategory({
        name: catName.trim(),
        slug: catSlug.trim() || catName.trim(),
        description: catDescription.trim()
      });
      setIsSavingCat(false);
      if (res.success) {
        showToast(`Equipment category "${catName}" added.`);
        setIsCatModalOpen(false);
      } else {
        showToast(res.message || 'Failed to add category');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex font-sans selection:bg-[#FFB800] selection:text-slate-950">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FFB800] text-slate-950 px-5 py-3 rounded-lg shadow-2xl font-bold text-sm flex items-center gap-2.5 border border-amber-400 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-slate-950 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ===================== SIDEBAR ===================== */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        
        {/* Brand Banner */}
        <div className="p-5 border-b border-gray-200 bg-white">
          <img 
            src={dawoodLogo} 
            alt="Dawood Equipment Co." 
            className="h-11 w-auto object-contain mb-1.5" 
          />
          <div className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider">
            Admin Control Center
          </div>
        </div>

        {/* Admin Identity Card */}
        <div className="p-4 mx-3 my-3 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-[#FFB800] flex items-center justify-center text-slate-950 font-bold text-xs uppercase shadow">
              TD
            </div>
            <div className="overflow-hidden flex-1">
              <div className="text-xs font-bold text-gray-900 truncate">
                {currentUser?.name || 'Tariq Dawood'}
              </div>
              <div className="text-[10px] font-mono text-amber-600 truncate">
                Dealership Director
              </div>
            </div>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" title="Live Administrator Session" />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 space-y-1 py-2">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#FFB800] text-slate-950 shadow-md font-black'
                : 'text-gray-500 hover:text-gray-900 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-4 h-4" />
              <span>Dealership Overview</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-green-100 text-green-700">LIVE</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-[#FFB800] text-slate-950 shadow-md font-black'
                : 'text-gray-500 hover:text-gray-900 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              <span>Fleet & Machinery</span>
            </div>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
              activeTab === 'inventory' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-700'
            }`}>
              {totalUnits}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('add-machine')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'add-machine'
                ? 'bg-[#FFB800] text-slate-950 shadow-md font-black'
                : 'text-gray-500 hover:text-gray-900 hover:bg-amber-50'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add New Equipment</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-[#FFB800] text-slate-950 shadow-md font-black'
                : 'text-gray-500 hover:text-gray-900 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>Buyer Inquiries & RFQs</span>
            </div>
            {pendingLeads > 0 && (
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === 'leads' ? 'bg-rose-600 text-white' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}>
                {pendingLeads} new
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('logistics')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'logistics'
                ? 'bg-[#FFB800] text-slate-950 shadow-md font-black'
                : 'text-gray-500 hover:text-gray-900 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4" />
              <span>Ocean Freight & Tracking</span>
            </div>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
              activeTab === 'logistics' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              {activeShipments}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('buyouts')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'buyouts'
                ? 'bg-[#FFB800] text-slate-950 shadow-md font-black'
                : 'text-gray-500 hover:text-gray-900 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <DollarSign className="w-4 h-4" />
              <span>Buy-In Machine Offers</span>
            </div>
            {pendingOffers > 0 && (
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-600 border border-amber-300">
                {pendingOffers}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('users'); fetchUsers(); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'bg-[#FFB800] text-slate-950 shadow-md font-black'
                : 'text-gray-500 hover:text-gray-900 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>User Administration</span>
            </div>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
              activeTab === 'users' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              {users.length || 'Users'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('taxonomy')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'taxonomy'
                ? 'bg-[#FFB800] text-slate-950 shadow-md font-black'
                : 'text-gray-500 hover:text-gray-900 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Tags className="w-4 h-4" />
              <span>Makes & Categories</span>
            </div>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
              activeTab === 'taxonomy' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              {manufacturers.length + categories.length}
            </span>
          </button>

        </nav>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-2">
          
          <button
            type="button"
            onClick={onNavigateHome}
            className="w-full py-2.5 px-3 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Globe2 className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>View Public Website</span>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </button>

          <button
            type="button"
            onClick={() => { logout(); onNavigateHome(); }}
            className="w-full py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-800 border border-rose-300 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Administrator</span>
          </button>

        </div>

      </aside>

      {/* ===================== MAIN CONTENT ===================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Operational Bar */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
              Dealership Portal
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <h1 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-heading">
              {activeTab === 'overview' && 'Executive Metrics & Dashboard Overview'}
              {activeTab === 'inventory' && 'Fleet & Machinery Management (All Powers)'}
              {activeTab === 'add-machine' && 'Add New Machinery Unit to Fleet & Database'}
              {activeTab === 'leads' && 'Buyer Inquiries & Pro-Forma Quotes'}
              {activeTab === 'logistics' && 'Worldwide Ocean Freight Dispatch & Container Milestones'}
              {activeTab === 'buyouts' && 'Surplus Equipment Appraisal & Buyout Offers'}
              {activeTab === 'users' && 'Client & Administrator Accounts in MongoDB'}
              {activeTab === 'taxonomy' && 'Manufacturers & Equipment Product Types (Dynamic Taxonomy)'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Navigate to Add Machine Page */}
            <button
              onClick={() => setActiveTab('add-machine')}
              className="px-3.5 py-2 bg-[#FFB800] hover:bg-[#E5A700] text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded-lg shadow flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Equipment Unit</span>
            </button>

            {/* Quick Dispatch Modal */}
            <button
              onClick={() => setIsDispatchModalOpen(true)}
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold rounded-lg border border-gray-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>Dispatch Container</span>
            </button>

            {/* Database Sync Refresh */}
            <button
              onClick={() => { refreshFleet(); refreshInquiries(); refreshShipments(); refreshSellOffers(); showToast('Synchronized with MongoDB'); }}
              title="Refresh from MongoDB"
              className="p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg border border-gray-300 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

          </div>
        </header>

        {/* Tab Body */}
        <main className="p-6 space-y-6">

          {/* ======================= TAB 1: OVERVIEW ======================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* KPI Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-gray-500 font-bold">Total Machinery Units</span>
                    <Layers className="w-5 h-5 text-[#FFB800]" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-gray-900 font-heading">{totalUnits}</span>
                    <span className="text-xs text-emerald-400 font-bold">({availableUnits} Available)</span>
                  </div>
                  <div className="mt-2 text-[11px] text-gray-400 font-mono">
                    {soldUnits} units marked as SOLD
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[#FFB800]" />
                </div>

                <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-gray-500 font-bold">Buyer Inquiries & Quotes</span>
                    <FileText className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-gray-900 font-heading">{inquiries.length}</span>
                    <span className="text-xs text-rose-400 font-bold">({pendingLeads} Pending RFQ)</span>
                  </div>
                  <div className="mt-2 text-[11px] text-gray-400 font-mono">
                    Pro-forma invoices & client leads
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-amber-500" />
                </div>

                <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-gray-500 font-bold">Container Shipments</span>
                    <Truck className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-gray-900 font-heading">{shipments.length}</span>
                    <span className="text-xs text-cyan-600 font-bold">({activeShipments} In Transit)</span>
                  </div>
                  <div className="mt-2 text-[11px] text-gray-400 font-mono">
                    Maersk, MSC, Hapag-Lloyd ocean freight
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-cyan-400" />
                </div>

                <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-gray-500 font-bold">Fleet Inventory Valuation</span>
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-gray-900 font-heading">
                      ${(totalFleetValue / 1000000).toFixed(2)}M
                    </span>
                    <span className="text-xs text-gray-500 font-mono">USD</span>
                  </div>
                  <div className="mt-2 text-[11px] text-gray-400 font-mono">
                    Verified book value of listed machinery
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-emerald-400" />
                </div>

              </div>

              {/* Recent Buyer Inquiries Feed */}
              <div className="p-5 bg-white rounded-xl border border-gray-200 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-500" />
                      Latest Client Inquiries & Pro-Forma Requests
                    </h3>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="text-xs font-bold text-[#FFB800] hover:underline"
                    >
                      View All ({inquiries.length}) →
                    </button>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px]">
                    {inquiries.slice(0, 4).map(inq => (
                      <div key={inq.id} className="p-3 bg-gray-100/70 rounded-lg border border-gray-200 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {inq.machineImage ? (
                            <img src={inq.machineImage} alt="" className="w-12 h-10 object-cover rounded border border-gray-300 shrink-0" />
                          ) : (
                            <div className="w-12 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400 shrink-0">
                              🚜
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-gray-900 truncate">{inq.machineTitle}</div>
                            <div className="text-[11px] text-gray-500 truncate">
                              Buyer: <span className="text-gray-800">{inq.customerName}</span> ({inq.company || inq.country})
                            </div>
                            <div className="text-[10px] font-mono text-amber-700">
                              Port: {inq.destinationPort}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                            inq.status === 'pending'
                              ? 'bg-rose-50 text-rose-400 border-rose-300'
                              : inq.status === 'deposit_paid'
                              ? 'bg-emerald-50 text-emerald-400 border-emerald-300'
                              : 'bg-amber-50 text-amber-700 border-amber-300'
                          }`}>
                            {inq.status.replace('_', ' ')}
                          </span>
                          <button
                            onClick={() => { setActiveTab('leads'); handleOpenEditInquiry(inq); }}
                            className="p-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded cursor-pointer"
                            title="Manage Inquiry"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

            </div>
          )}

          {/* ======================= TAB 2: INVENTORY & FLEET ======================= */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              
              {/* Filter and Search Bar */}
              <div className="p-4 bg-white rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-4">
                
                <div className="flex items-center gap-3 flex-1 min-w-[280px]">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by title, model, stock number (e.g. D6E, PC300)..."
                      className="w-full pl-9 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  
                  {/* Vendor Filter */}
                  <select
                    value={filterVendor}
                    onChange={(e) => setFilterVendor(e.target.value)}
                    className="bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-700 py-2 px-3 focus:outline-none"
                  >
                    <option value="all">All Manufacturers</option>
                    {manufacturers.map(m => (
                      <option key={m.slug || m.name} value={m.slug || m.name}>{m.name}</option>
                    ))}
                  </select>

                  {/* Status Filter */}
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-700 py-2 px-3 focus:outline-none"
                  >
                    <option value="all">All Statuses ({totalUnits})</option>
                    <option value="available">Available Units ({availableUnits})</option>
                    <option value="sold">Sold Units ({soldUnits})</option>
                  </select>

                  {/* Category Filter */}
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-700 py-2 px-3 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(c => (
                      <option key={c.slug || c.name} value={c.slug || c.name}>{c.name}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => setActiveTab('add-machine')}
                    className="px-3.5 py-2 bg-[#FFB800] hover:bg-[#E5A700] text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Unit</span>
                  </button>

                </div>

              </div>

              {/* Machinery Table / Grid */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-gray-500 uppercase">
                    Displaying {filteredFleet.length} of {totalUnits} Heavy Machinery Units in MongoDB
                  </span>
                  <span className="text-[11px] text-amber-700 font-mono">
                    Admin Powers: 1-Click Sold Toggle · Edit Specs · Delete
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-100 text-gray-500 font-mono uppercase text-[11px] border-b border-gray-200">
                      <tr>
                        <th className="py-3 px-4">Machine Details</th>
                        <th className="py-3 px-3">Stock # / VIN</th>
                        <th className="py-3 px-3">Specs (Yr / Hrs)</th>
                        <th className="py-3 px-3">List Price</th>
                        <th className="py-3 px-3">Live Status</th>
                        <th className="py-3 px-4 text-right">Admin Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredFleet.map(machine => {
                        const isSold = Boolean(machine.isSold);
                        const img = machine.image || (machine as any).mainImage;

                        return (
                          <tr key={machine.id || machine.stockNumber} className="hover:bg-gray-100/40 transition-colors">
                            
                            {/* Machine Info */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                {img ? (
                                  <img 
                                    src={img} 
                                    alt="" 
                                    className="w-14 h-12 object-cover rounded-lg border border-gray-300 shrink-0" 
                                  />
                                ) : (
                                  <div className="w-14 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                                    🚜
                                  </div>
                                )}
                                <div>
                                  <div className="font-bold text-gray-900 text-xs hover:text-[#FFB800] transition-colors cursor-pointer" onClick={() => onInspectMachine(machine)}>
                                    {machine.title || machine.name}
                                  </div>
                                  <div className="text-[11px] text-gray-500 flex items-center gap-2 mt-0.5">
                                    <span className="font-mono text-amber-700">{machine.vendor}</span>
                                    <span>·</span>
                                    <span>{machine.category || machine.productType}</span>
                                  </div>
                                  <div className="text-[10px] text-gray-400 font-mono">
                                    Location: {machine.specs?.location || 'Chicago Yard, IL'}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Stock # */}
                            <td className="py-3.5 px-3 font-mono">
                              <div className="font-bold text-gray-800">{machine.stockNumber}</div>
                              <div className="text-[10px] text-gray-400 truncate max-w-[120px]">
                                {machine.specs?.serialVin || machine.id}
                              </div>
                            </td>

                            {/* Year / Hours */}
                            <td className="py-3.5 px-3">
                              <div className="font-bold text-gray-900">{machine.year || '2020'}</div>
                              <div className="text-gray-500 font-mono text-[11px]">
                                {machine.hours ? `${machine.hours.toLocaleString()} hrs` : 'Low Hours'}
                              </div>
                            </td>

                            {/* Price */}
                            <td className="py-3.5 px-3">
                              <div className="font-mono font-bold text-emerald-400">
                                {machine.numericPrice ? `$${machine.numericPrice.toLocaleString()}` : machine.priceDisplay || 'Call for Price'}
                              </div>
                              <div className="text-[10px] text-gray-400">
                                {machine.priceDisplay}
                              </div>
                            </td>

                            {/* Sold Status Toggle */}
                            <td className="py-3.5 px-3">
                              <button
                                type="button"
                                onClick={() => handleToggleSold(machine.id || machine.stockNumber || '', machine.title || machine.name)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider border flex items-center gap-1.5 transition-all cursor-pointer ${
                                  isSold
                                    ? 'bg-rose-50 text-rose-600 border-rose-700/80 hover:bg-rose-100'
                                    : 'bg-emerald-50 text-emerald-600 border-emerald-400 hover:bg-emerald-100'
                                }`}
                                title="Click to toggle status on live website"
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${isSold ? 'bg-rose-400' : 'bg-emerald-400'}`} />
                                <span>{isSold ? 'SOLD' : 'AVAILABLE'}</span>
                              </button>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                
                                <button
                                  type="button"
                                  onClick={() => onInspectMachine(machine)}
                                  className="p-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded cursor-pointer"
                                  title="View Public Detail Page"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setEditingMachine(machine)}
                                  className="p-1.5 bg-gray-200 hover:bg-gray-300 text-amber-700 rounded cursor-pointer"
                                  title="Edit Specs & Pricing"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteMachine(machine.id || machine.stockNumber || '', machine.title || machine.name)}
                                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-400 rounded cursor-pointer"
                                  title="Delete from MongoDB"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>

                              </div>
                            </td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* ======================= TAB 3: INQUIRIES & RFQs ======================= */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              
              <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-gray-900 uppercase font-heading">
                    Buyer Purchase Inquiries & Pro-Forma Quotes
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Manage buyer requests, update status, issue pro-forma invoice numbers, and maintain internal broker logs.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg">
                  {inquiries.length} Total Records
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {inquiries.map(inq => (
                  <div key={inq.id} className="p-5 bg-white rounded-xl border border-gray-200 space-y-4">
                    
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      
                      <div className="flex items-start gap-4">
                        {inq.machineImage ? (
                          <img src={inq.machineImage} alt="" className="w-16 h-14 object-cover rounded-lg border border-gray-300 shrink-0" />
                        ) : (
                          <div className="w-16 h-14 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                            🚜
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-black text-gray-900">{inq.machineTitle}</div>
                          <div className="text-xs text-amber-700 font-mono mt-0.5">
                            Stock: {inq.machineStock || inq.machineId} · PI: {inq.proFormaNumber || 'DEQ-PI-PENDING'}
                          </div>
                          <div className="text-xs text-gray-700 mt-1 flex flex-wrap items-center gap-3">
                            <span><strong>Buyer:</strong> {inq.customerName}</span>
                            <span><strong>Email:</strong> {inq.customerEmail}</span>
                            <span><strong>Phone:</strong> {inq.customerPhone || 'N/A'}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            <strong>Company:</strong> {inq.company || 'Enterprise Buyer'} · <strong>Destination:</strong> {inq.destinationPort}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${
                          inq.status === 'pending'
                            ? 'bg-rose-50 text-rose-600 border-rose-700'
                            : inq.status === 'deposit_paid'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-700'
                            : inq.status === 'quoted'
                            ? 'bg-blue-950/80 text-blue-300 border-blue-700'
                            : 'bg-amber-950/80 text-amber-600 border-amber-700'
                        }`}>
                          {inq.status.replace('_', ' ')}
                        </span>
                        
                        <div className="text-sm font-mono font-bold text-emerald-400">
                          {inq.priceQuoted ? `Quote: $${inq.priceQuoted.toLocaleString()}` : (inq.totalEstimatedAmount ? `Est: $${inq.totalEstimatedAmount.toLocaleString()}` : 'Awaiting Quote')}
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleOpenEditInquiry(inq)}
                            className="px-3 py-1.5 bg-[#FFB800] hover:bg-[#E5A700] text-slate-950 font-bold text-xs rounded flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Update Status & Notes</span>
                          </button>

                          <button
                            onClick={() => { setDeleteTarget({ type: 'inquiry', id: inq.id, label: inq.machineTitle || 'Inquiry' }); setDeleteModalOpen(true); }}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-400 rounded cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>

                    </div>

                    {/* Broker Notes / Internal tracking */}
                    {inq.brokerNotes && (
                      <div className="p-3 bg-gray-100 rounded-lg border border-gray-200 text-xs font-mono text-gray-700">
                        <span className="text-amber-700 font-bold">Dealership Broker Notes: </span>
                        {inq.brokerNotes}
                      </div>
                    )}

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ======================= TAB 4: LOGISTICS & SHIPMENTS ======================= */}
          {activeTab === 'logistics' && (
            <div className="space-y-6">
              
              <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-gray-900 uppercase font-heading">
                    Ocean Freight & Container Tracking
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Live logistics tracking for containerized and Ro-Ro machinery exports departing US ports.
                  </p>
                </div>
                <button
                  onClick={() => setIsDispatchModalOpen(true)}
                  className="px-3.5 py-2 bg-[#FFB800] text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Dispatch New Shipment</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {shipments.map(shp => (
                  <div key={shp.id} className="p-5 bg-white rounded-xl border border-gray-200 space-y-4">
                    
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-black text-gray-900">{shp.machineTitle}</div>
                        <div className="text-xs text-amber-700 font-mono mt-0.5">
                          Carrier: {shp.carrierName} · Tracking: {shp.trackingNumber} · Container: {shp.containerNumber || '40FT-HC-ASSIGNED'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Consignee: <strong className="text-gray-900">{shp.buyerName}</strong> ({shp.buyerCompany}) · Port: <strong className="text-amber-600">{shp.destinationPort}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-full text-xs font-mono font-bold uppercase">
                          {shp.status.replace(/_/g, ' ')}
                        </span>
                        
                        {/* Milestone Fast Changer */}
                        <select
                          value={shp.status}
                          onChange={async (e) => {
                            const newStatus = e.target.value;
                            await updateShipmentStatus(shp.id, newStatus, `Milestone updated to ${newStatus}`);
                            showToast(`Shipment status updated to ${newStatus}`);
                          }}
                          className="bg-gray-100 border border-gray-300 text-xs text-gray-800 py-1.5 px-2.5 rounded focus:outline-none"
                        >
                          <option value="yard_prep">Yard Prep</option>
                          <option value="trucking_to_port">Trucking to Port</option>
                          <option value="teardown_containerizing">Teardown & Containerizing</option>
                          <option value="vessel_transit">Vessel Transit</option>
                          <option value="port_customs">Port Customs</option>
                          <option value="delivered">Delivered</option>
                        </select>

                        <button
                          onClick={() => { setDeleteTarget({ type: 'shipment', id: shp.id, label: shp.machineTitle || 'Shipment' }); setDeleteModalOpen(true); }}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-400 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-mono text-gray-500 mb-1.5">
                        <span>Current Milestone: <strong className="text-gray-900">{shp.currentMilestone}</strong></span>
                        <span>{shp.progressPercent}% Transit</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200">
                        <div 
                          className="bg-[#FFB800] h-full rounded-full transition-all duration-500" 
                          style={{ width: `${shp.progressPercent || 35}%` }} 
                        />
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ======================= TAB 5: BUY-IN OFFERS ======================= */}
          {activeTab === 'buyouts' && (
            <div className="space-y-6">
              
              <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-gray-900 uppercase font-heading">
                    Surplus Equipment Buy-In & Appraisal Submissions
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Machines submitted by contractors and sellers looking for immediate dealership buyout.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg">
                  {sellOffers.length} Submissions
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {sellOffers.map(offer => (
                  <div key={offer.id} className="p-5 bg-white rounded-xl border border-gray-200 space-y-3">
                    
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-black text-gray-900">
                          {offer.year} {offer.equipmentMake} {offer.equipmentModel}
                        </div>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">
                          Hours: {offer.hours.toLocaleString()} · Location: {offer.location} · VIN: {offer.serialVin || 'N/A'}
                        </div>
                        <div className="text-xs text-gray-700 mt-1">
                          Seller: <strong>{offer.sellerName}</strong> ({offer.sellerCompany}) · Contact: {offer.sellerEmail} / {offer.sellerPhone}
                        </div>
                        {offer.conditionNotes && (
                          <div className="text-xs text-gray-500 mt-2 bg-gray-100 p-2.5 rounded border border-gray-200 font-mono">
                            Condition: {offer.conditionNotes}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-xs font-mono text-gray-500">
                          Seller Asking: <strong className="text-gray-900">${offer.askingPrice.toLocaleString()}</strong>
                        </div>
                        {offer.adminOfferPrice && (
                          <div className="text-xs font-mono text-emerald-400">
                            Dealership Offer: <strong>${offer.adminOfferPrice.toLocaleString()}</strong>
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-2">
                          <select
                            value={offer.status}
                            onChange={async (e) => {
                              const newStatus = e.target.value;
                              await updateSellOfferStatus(offer.id, newStatus);
                              showToast(`Offer status set to ${newStatus}`);
                            }}
                            className="bg-gray-100 border border-gray-300 text-xs text-gray-800 py-1 px-2 rounded"
                          >
                            <option value="under_review">Under Review</option>
                            <option value="offer_sent">Offer Sent</option>
                            <option value="inspection_scheduled">Inspection Scheduled</option>
                            <option value="wire_paid">Wire Paid</option>
                            <option value="declined">Declined</option>
                          </select>

                          <button
                            onClick={() => { setCounterOfferTarget({ id: offer.id, askingPrice: offer.askingPrice }); setCounterOfferValue(String(Math.round(offer.askingPrice * 0.85))); setCounterOfferError(''); setCounterOfferModalOpen(true); }}
                            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded cursor-pointer"
                          >
                            Counter Offer
                          </button>

                          <button
                            onClick={() => { setDeleteTarget({ type: 'offer', id: offer.id, label: `${offer.year} ${offer.equipmentMake} ${offer.equipmentModel}` }); setDeleteModalOpen(true); }}
                            className="p-1 bg-rose-50 text-rose-400 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ======================= TAB 6: USER MANAGEMENT ======================= */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              
              <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-gray-900 uppercase font-heading">
                    Registered Users & Client Directory (MongoDB)
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Manage client credentials, roles (Buyer / Admin), and access statuses.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setIsAddUserModalOpen(true); setNewUserError(''); }}
                    className="px-3 py-1.5 bg-[#FFB800] hover:bg-[#E5A700] text-slate-950 text-xs font-black uppercase rounded flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add User</span>
                  </button>
                  <button
                    onClick={() => fetchUsers()}
                    className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold rounded flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-100 text-gray-500 font-mono uppercase text-[11px] border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4">User / Contact</th>
                      <th className="py-3 px-3">Company & Region</th>
                      <th className="py-3 px-3">Role</th>
                      <th className="py-3 px-3">Account Status</th>
                      <th className="py-3 px-4 text-right">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map(u => (
                      <tr key={u._id} className="hover:bg-gray-100/40">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-gray-900">{u.name}</div>
                          <div className="text-[11px] text-amber-700 font-mono">{u.email}</div>
                          <div className="text-[10px] text-gray-400">{u.phone}</div>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-gray-800">{u.company || 'Enterprise'}</div>
                          <div className="text-[11px] text-gray-500">{u.country}</div>
                          <div className="text-[10px] text-gray-400 font-mono">{u.destinationPort}</div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                            u.role === 'admin'
                              ? 'bg-amber-100 text-[#FFB800] border-amber-300 font-black'
                              : 'bg-gray-200 text-gray-700 border-gray-300'
                          }`}>
                            {u.role === 'admin' ? '👑 Admin' : '🚜 Buyer'}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            u.status === 'active' ? 'bg-emerald-50 text-emerald-400' : 'bg-rose-50 text-rose-400'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={async () => {
                              const nextStatus = u.status === 'active' ? 'suspended' : 'active';
                              await updateUserStatus(u._id, nextStatus);
                              showToast(`User status changed to ${nextStatus}`);
                            }}
                            className={`px-3 py-1 rounded text-[11px] font-mono cursor-pointer font-bold ${
                              u.status === 'active' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                            }`}
                          >
                            {u.status === 'active' ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ======================= TAB 7: TAXONOMY MANAGEMENT ======================= */}
          {activeTab === 'taxonomy' && (
            <div className="space-y-6">

              {/* Header Card */}
              <div className="p-5 bg-white rounded-xl border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                    <Tags className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900 uppercase font-heading tracking-wide">
                      Manufacturers & Equipment Product Types
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Dynamically manage machinery makes and equipment categories in MongoDB. Changes immediately sync across the website, inventory filters, and adding machinery.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <button
                    onClick={handleOpenAddMfr}
                    className="px-3.5 py-2 bg-[#FFB800] hover:bg-[#E5A700] text-slate-950 text-xs font-black uppercase tracking-wider rounded-lg flex items-center gap-1.5 cursor-pointer shadow transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Manufacturer</span>
                  </button>
                  <button
                    onClick={handleOpenAddCat}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow transition-all"
                  >
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Add Product Type</span>
                  </button>
                  <button
                    onClick={() => { refreshTaxonomy(); showToast('Taxonomy reloaded from database'); }}
                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors"
                    title="Refresh data"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sub-tab navigation and Search bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl border border-gray-200">
                  <button
                    onClick={() => setTaxonomyTab('manufacturers')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      taxonomyTab === 'manufacturers'
                        ? 'bg-white text-slate-950 shadow-xs font-black'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-amber-500" />
                    <span>Manufacturers & Makes</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      taxonomyTab === 'manufacturers' ? 'bg-amber-100 text-amber-900' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {manufacturers.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setTaxonomyTab('categories')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      taxonomyTab === 'categories'
                        ? 'bg-white text-slate-950 shadow-xs font-black'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Layers className="w-4 h-4 text-amber-500" />
                    <span>Equipment Categories & Types</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      taxonomyTab === 'categories' ? 'bg-amber-100 text-amber-900' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {categories.length}
                    </span>
                  </button>
                </div>

                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={taxonomySearch}
                    onChange={(e) => setTaxonomySearch(e.target.value)}
                    placeholder={taxonomyTab === 'manufacturers' ? 'Search manufacturers...' : 'Search categories...'}
                    className="w-full pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {taxonomySearch && (
                    <button
                      onClick={() => setTaxonomySearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Manufacturers Table */}
              {taxonomyTab === 'manufacturers' && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                  {filteredMfrs.length === 0 ? (
                    <div className="p-12 text-center">
                      <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h4 className="text-sm font-bold text-gray-800">No Manufacturers Found</h4>
                      <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                        {taxonomySearch ? `No manufacturer matches "${taxonomySearch}".` : 'No manufacturers configured yet.'}
                      </p>
                      <button
                        onClick={handleOpenAddMfr}
                        className="mt-4 px-4 py-2 bg-[#FFB800] hover:bg-[#E5A700] text-slate-950 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add First Manufacturer</span>
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-500 font-mono uppercase text-[11px] border-b border-gray-200">
                          <tr>
                            <th className="py-3 px-4">Manufacturer Name & Code</th>
                            <th className="py-3 px-3">Country of Origin</th>
                            <th className="py-3 px-3">Description / Focus</th>
                            <th className="py-3 px-3 text-center">Units in Fleet</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredMfrs.map((m) => {
                            const count = fleet.filter(item => {
                              const v = (item.vendor || '').toUpperCase();
                              const mf = (item.manufacturer || '').toUpperCase();
                              const slug = (m.slug || '').toUpperCase();
                              const nm = (m.name || '').toUpperCase();
                              return v === slug || v === nm || mf === slug || mf === nm;
                            }).length;

                            return (
                              <tr key={m._id || m.id || m.slug} className="hover:bg-gray-50/70 transition-colors">
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-black flex items-center justify-center text-xs shrink-0">
                                      {m.name.charAt(0)}
                                    </div>
                                    <div>
                                      <div className="font-bold text-gray-900 text-sm">{m.name}</div>
                                      <span className="inline-block mt-0.5 px-2 py-0.5 bg-gray-100 text-gray-700 font-mono font-bold text-[10px] rounded border border-gray-200">
                                        {m.slug || m.name.toUpperCase()}
                                      </span>
                                    </div>
                                  </div>
                                </td>

                                <td className="py-3.5 px-3">
                                  <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                                    <Globe2 className="w-3.5 h-3.5 text-gray-400" />
                                    <span>{m.country || 'Global'}</span>
                                  </div>
                                </td>

                                <td className="py-3.5 px-3 max-w-xs">
                                  <p className="text-gray-600 text-xs line-clamp-2">
                                    {m.description || <span className="italic text-gray-400">No description provided</span>}
                                  </p>
                                </td>

                                <td className="py-3.5 px-3 text-center">
                                  <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
                                    count > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500'
                                  }`}>
                                    {count} {count === 1 ? 'unit' : 'units'}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => handleOpenEditMfr(m)}
                                      className="p-1.5 bg-gray-100 hover:bg-amber-100 hover:text-amber-800 text-gray-700 rounded-lg cursor-pointer transition-colors"
                                      title="Edit Manufacturer"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        setDeleteTarget({
                                          type: 'manufacturer',
                                          id: m._id || m.id || '',
                                          label: m.name
                                        });
                                        setDeleteModalOpen(true);
                                      }}
                                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg cursor-pointer transition-colors"
                                      title="Delete Manufacturer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Categories Table */}
              {taxonomyTab === 'categories' && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                  {filteredCats.length === 0 ? (
                    <div className="p-12 text-center">
                      <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h4 className="text-sm font-bold text-gray-800">No Categories Found</h4>
                      <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                        {taxonomySearch ? `No equipment category matches "${taxonomySearch}".` : 'No categories configured yet.'}
                      </p>
                      <button
                        onClick={handleOpenAddCat}
                        className="mt-4 px-4 py-2 bg-[#FFB800] hover:bg-[#E5A700] text-slate-950 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add First Category</span>
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-500 font-mono uppercase text-[11px] border-b border-gray-200">
                          <tr>
                            <th className="py-3 px-4">Equipment Category / Type</th>
                            <th className="py-3 px-3">Filter Tag / Key</th>
                            <th className="py-3 px-3">Description / Machine Class</th>
                            <th className="py-3 px-3 text-center">Units in Fleet</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredCats.map((c) => {
                            const count = fleet.filter(item => {
                              const pt = (item.productType || '').toLowerCase();
                              const cat = (item.category || '').toLowerCase();
                              const lbl = (item.categoryLabel || '').toLowerCase();
                              const slug = (c.slug || '').toLowerCase();
                              const nm = (c.name || '').toLowerCase();
                              return pt === slug || pt === nm || cat === slug || cat === nm || lbl === slug || lbl === nm;
                            }).length;

                            return (
                              <tr key={c._id || c.id || c.slug} className="hover:bg-gray-50/70 transition-colors">
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-bold flex items-center justify-center shrink-0">
                                      <Layers className="w-4 h-4 text-amber-600" />
                                    </div>
                                    <div className="font-bold text-gray-900 text-sm">{c.name}</div>
                                  </div>
                                </td>

                                <td className="py-3.5 px-3">
                                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 font-mono font-bold text-[11px] rounded border border-gray-200">
                                    {c.slug || c.name}
                                  </span>
                                </td>

                                <td className="py-3.5 px-3 max-w-sm">
                                  <p className="text-gray-600 text-xs line-clamp-2">
                                    {c.description || <span className="italic text-gray-400">No description provided</span>}
                                  </p>
                                </td>

                                <td className="py-3.5 px-3 text-center">
                                  <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
                                    count > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500'
                                  }`}>
                                    {count} {count === 1 ? 'unit' : 'units'}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => handleOpenEditCat(c)}
                                      className="p-1.5 bg-gray-100 hover:bg-amber-100 hover:text-amber-800 text-gray-700 rounded-lg cursor-pointer transition-colors"
                                      title="Edit Category"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        setDeleteTarget({
                                          type: 'category',
                                          id: c._id || c.id || '',
                                          label: c.name
                                        });
                                        setDeleteModalOpen(true);
                                      }}
                                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg cursor-pointer transition-colors"
                                      title="Delete Category"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* ===================== PAGE: ADD NEW MACHINERY ===================== */}
          {activeTab === 'add-machine' && (
            <div className="max-w-4xl mx-auto space-y-6">

            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-600 font-bold mb-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('inventory')}
                    className="hover:text-amber-800 cursor-pointer transition-colors"
                  >
                    Fleet & Machinery
                  </button>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-700">Add New Unit</span>
                </div>
                <h2 className="text-xl font-black font-heading uppercase text-gray-900 tracking-wide">
                  Add Machinery Unit to Fleet & Database
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Fill in the details below. All fields with * are required. Media will be uploaded to the server.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('inventory')}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-lg cursor-pointer transition-colors flex items-center gap-2"
              >
                <X className="w-3.5 h-3.5" />
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddNewMachineSubmit} className="space-y-6">

              {/* ── Section 1: Basic Information ── */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <span className="text-amber-700 font-black text-[10px]">1</span>
                  </div>
                  <h3 className="text-xs font-black font-heading uppercase text-gray-700 tracking-wider">Basic Information</h3>
                </div>
                <div className="p-6 space-y-4 text-xs">

                  <div>
                    <label className="block font-bold text-gray-700 uppercase font-mono mb-1.5">Equipment Title *</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Caterpillar D8R Crawler Dozer"
                      required
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 uppercase font-mono mb-1.5">Manufacturer *</label>
                      <select
                        value={newVendor}
                        onChange={(e) => setNewVendor(e.target.value as MachineryVendor)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      >
                        {manufacturers.map(m => (
                          <option key={m.slug || m.name} value={m.slug || m.name}>
                            {m.name} ({m.slug || m.name})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 uppercase font-mono mb-1.5">Equipment Category *</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as EquipmentCategory)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      >
                        {categories.map(c => (
                          <option key={c.slug || c.name} value={c.slug || c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 uppercase font-mono mb-1.5">Model</label>
                      <input
                        type="text"
                        value={newModel}
                        onChange={(e) => setNewModel(e.target.value)}
                        placeholder="e.g. D8R II"
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 uppercase font-mono mb-1.5">Year</label>
                      <input
                        type="number"
                        value={newYear}
                        onChange={(e) => setNewYear(Number(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 uppercase font-mono mb-1.5">Operating Hours</label>
                      <input
                        type="number"
                        value={newHours}
                        onChange={(e) => setNewHours(Number(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 uppercase font-mono mb-1.5">Numeric Price ($USD)</label>
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 uppercase font-mono mb-1.5">Stock Number</label>
                      <input
                        type="text"
                        value={newStock}
                        onChange={(e) => setNewStock(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 uppercase font-mono mb-1.5">Description</label>
                    <textarea
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      rows={3}
                      placeholder="Equipment condition, history, features, included attachments..."
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                    />
                  </div>

                </div>
              </div>

              {/* ── Section 2: Cover Photo ── */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <span className="text-amber-700 font-black text-[10px]">2</span>
                  </div>
                  <h3 className="text-xs font-black font-heading uppercase text-gray-700 tracking-wider">Primary Cover Photo *</h3>
                  <span className="ml-auto text-[10px] text-gray-400 font-mono">JPG, PNG, WEBP — High resolution</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-48 h-36 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 overflow-hidden shrink-0 flex items-center justify-center relative">
                      {newImageUrl ? (
                        <img src={newImageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-1" />
                          <span className="text-xs text-gray-400">No photo yet</span>
                        </div>
                      )}
                      {isUploadingPrimary && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white gap-2">
                          <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                          <span className="text-xs font-mono">Uploading...</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-3 w-full">
                      <input
                        type="file"
                        id="primary-photo-input"
                        accept="image/*"
                        onChange={handlePrimaryFileSelect}
                        className="hidden"
                      />
                      <label
                        htmlFor="primary-photo-input"
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-amber-50 text-gray-800 border-2 border-dashed border-amber-300 hover:border-amber-500 font-bold text-sm rounded-xl cursor-pointer transition-all"
                      >
                        <Upload className="w-5 h-5 text-amber-500" />
                        <span>{newImageUrl ? 'Change Cover Photo' : '+ Upload Cover Photo'}</span>
                      </label>
                      <p className="text-xs text-gray-500 text-center">
                        Select a high-resolution machine photo (operator cabin angle recommended)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Section 3: Gallery Photos ── */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <span className="text-amber-700 font-black text-[10px]">3</span>
                    </div>
                    <h3 className="text-xs font-black font-heading uppercase text-gray-700 tracking-wider">
                      Gallery Photos <span className="text-gray-400 font-normal">({newGalleryImages.length} uploaded)</span>
                    </h3>
                  </div>
                  <div>
                    <input
                      type="file"
                      id="gallery-photos-input"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryFilesSelect}
                      className="hidden"
                    />
                    <label
                      htmlFor="gallery-photos-input"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white font-black text-xs rounded-lg cursor-pointer transition-all shadow-sm"
                    >
                      {isUploadingGallery ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>+ Add / Upload Photos</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
                <div className="p-6">
                  {newGalleryImages.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3">
                      {newGalleryImages.map((url, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-100 aspect-video shadow-xs">
                          <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setNewGalleryImages(prev => prev.filter((_, i) => i !== idx))}
                            className="absolute top-1 right-1 p-1 bg-black/75 hover:bg-rose-600 text-white rounded-full transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                            title="Remove photo"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-white">
                            #{idx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <label
                      htmlFor="gallery-photos-input"
                      className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-amber-50/50 hover:border-amber-300 cursor-pointer transition-all"
                    >
                      <Layers className="w-8 h-8 text-gray-300 mb-2" />
                      <span className="text-xs font-bold text-gray-500">Click to upload multiple gallery photos</span>
                      <span className="text-[11px] text-gray-400 mt-0.5">Engine, cabin, undercarriage, attachments</span>
                    </label>
                  )}
                </div>
              </div>

              {/* ── Section 4: Video Walkaround ── */}
              <div className="bg-white rounded-2xl border border-amber-200 shadow-xs overflow-hidden">
                <div className="px-6 py-4 border-b border-amber-100 bg-amber-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center shrink-0">
                      <span className="text-amber-800 font-black text-[10px]">4</span>
                    </div>
                    <h3 className="text-xs font-black font-heading uppercase text-amber-900 tracking-wider">HD Video Walkaround Inspection</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-200 text-amber-800 font-bold">
                    Activates Video Tab & Badge
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  {newVideoUrl ? (
                    <div className="space-y-3">
                      <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-amber-300 aspect-video max-h-64 flex items-center justify-center">
                        <video src={newVideoUrl} controls className="w-full h-full object-cover" />
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="file" id="walkaround-video-input" accept="video/*" onChange={handleVideoFileSelect} className="hidden" />
                        <label htmlFor="walkaround-video-input" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 font-bold text-xs rounded cursor-pointer">
                          {isUploadingVideo ? (
                            <><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Uploading...</span></>
                          ) : (
                            <><Upload className="w-3.5 h-3.5 text-amber-600" /><span>Replace Video</span></>
                          )}
                        </label>
                        <button type="button" onClick={() => setNewVideoUrl('')} className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs font-bold rounded cursor-pointer">
                          Remove Video
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <input type="file" id="walkaround-video-input" accept="video/*" onChange={handleVideoFileSelect} className="hidden" />
                      <label htmlFor="walkaround-video-input" className="w-full flex flex-col items-center justify-center py-10 bg-white hover:bg-amber-50/50 border-2 border-dashed border-amber-300 rounded-xl cursor-pointer transition-colors">
                        {isUploadingVideo ? (
                          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm font-mono">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span>Uploading Video File (Please wait)...</span>
                          </div>
                        ) : (
                          <>
                            <Video className="w-10 h-10 text-amber-400 mb-2" />
                            <span className="text-sm font-bold text-gray-900">+ Upload Walkaround Video File</span>
                            <span className="text-xs text-gray-500 mt-1">Click to select MP4, MOV, or WebM from your device</span>
                          </>
                        )}
                      </label>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 uppercase font-mono mb-1.5">Video Title / Subject</label>
                      <input
                        type="text"
                        value={newVideoTitle}
                        onChange={(e) => setNewVideoTitle(e.target.value)}
                        placeholder="e.g. Engine Cold Start & Slewing Test"
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 uppercase font-mono mb-1.5">Video Duration</label>
                      <input
                        type="text"
                        value={newVideoDuration}
                        onChange={(e) => setNewVideoDuration(e.target.value)}
                        placeholder="e.g. 3:20 min"
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Submit Bar ── */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 flex items-center justify-between gap-4 sticky bottom-4 z-10">
                <div className="text-xs text-gray-500">
                  <span className="font-bold text-gray-700">Ready to publish?</span> Equipment will be live on the catalog immediately after saving.
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab('inventory')}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl cursor-pointer text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2.5 bg-[#FFB800] hover:bg-[#E5A700] text-slate-950 font-black uppercase tracking-wider rounded-xl font-heading shadow-md cursor-pointer text-sm transition-all flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Save & Publish to MongoDB
                  </button>
                </div>
              </div>

            </form>
          </div>
        )}

      </main>

    </div>



      {/* ===================== MODAL: EDIT MACHINERY ===================== */}
      {editingMachine && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#FFB800]" />
                <h3 className="font-heading font-black text-sm uppercase text-gray-900">
                  Edit Equipment: {editingMachine.title}
                </h3>
              </div>
              <button onClick={() => setEditingMachine(null)} className="text-gray-500 hover:text-gray-900 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditMachineSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Title</label>
                <input
                  type="text"
                  value={editingMachine.title}
                  onChange={(e) => setEditingMachine({ ...editingMachine, title: e.target.value, name: e.target.value })}
                  className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Manufacturer *</label>
                  <select
                    value={editingMachine.vendor || editingMachine.manufacturer}
                    onChange={(e) => setEditingMachine({ ...editingMachine, vendor: e.target.value, manufacturer: e.target.value })}
                    className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-gray-900 font-bold"
                  >
                    {manufacturers.map(m => (
                      <option key={m.slug || m.name} value={m.slug || m.name}>
                        {m.name} ({m.slug || m.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Equipment Category *</label>
                  <select
                    value={editingMachine.productType || editingMachine.category}
                    onChange={(e) => setEditingMachine({ ...editingMachine, productType: e.target.value as EquipmentCategory, category: e.target.value as EquipmentCategory, categoryLabel: e.target.value })}
                    className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-gray-900"
                  >
                    {categories.map(c => (
                      <option key={c.slug || c.name} value={c.slug || c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Price ($USD)</label>
                  <input
                    type="number"
                    value={editingMachine.numericPrice || 0}
                    onChange={(e) => setEditingMachine({ ...editingMachine, numericPrice: Number(e.target.value) })}
                    className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Hours</label>
                  <input
                    type="number"
                    value={editingMachine.hours || 0}
                    onChange={(e) => setEditingMachine({ ...editingMachine, hours: Number(e.target.value) })}
                    className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-gray-900"
                  />
                </div>
              </div>

              {/* Edit Primary Cover Photo */}
              <div className="space-y-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-800 uppercase font-mono text-[11px] flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
                    Cover Photo
                  </label>
                  <span className="text-gray-400 font-mono text-[10px]">JPG, PNG, WEBP</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-28 h-20 rounded bg-gray-200 border border-gray-300 overflow-hidden shrink-0 flex items-center justify-center relative">
                    {editingMachine.image ? (
                      <img src={editingMachine.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    )}
                    {isUploadingEditPrimary && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs gap-1 font-mono">
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5 w-full">
                    <input
                      type="file"
                      id="edit-primary-photo-input"
                      accept="image/*"
                      onChange={handleEditPrimaryFileSelect}
                      className="hidden"
                    />
                    <label
                      htmlFor="edit-primary-photo-input"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 font-bold text-xs rounded-lg cursor-pointer shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-500" />
                      <span>Upload New Cover Photo</span>
                    </label>
                    <p className="text-[11px] text-gray-500">Replaces current cover image with a new upload.</p>
                  </div>
                </div>
              </div>

              {/* Edit Gallery Photos */}
              <div className="space-y-2.5 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-800 uppercase font-mono text-[11px] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-500" />
                    Gallery Photos ({((editingMachine.images || []).length)} total)
                  </label>
                  <input
                    type="file"
                    id="edit-gallery-photos-input"
                    accept="image/*"
                    multiple
                    onChange={handleEditGalleryFilesSelect}
                    className="hidden"
                  />
                  <label
                    htmlFor="edit-gallery-photos-input"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold text-xs rounded-lg cursor-pointer"
                  >
                    {isUploadingEditGallery ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5 text-amber-600" />
                        <span>+ Upload Photos</span>
                      </>
                    )}
                  </label>
                </div>

                {editingMachine.images && editingMachine.images.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-1">
                    {editingMachine.images.map((url, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-300 bg-gray-200 aspect-video shadow-xs">
                        <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = (editingMachine.images || []).filter((_, i) => i !== idx);
                            setEditingMachine({
                              ...editingMachine,
                              images: newImages,
                              image: newImages[0] || editingMachine.image
                            });
                          }}
                          className="absolute top-1 right-1 p-1 bg-black/75 hover:bg-rose-600 text-white rounded-full transition-colors cursor-pointer"
                          title="Remove photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-black/60 text-[9px] font-mono text-white">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Edit HD Video Walkaround */}
              <div className="space-y-3 p-4 bg-amber-50/70 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-900 uppercase font-mono text-[11px] flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-amber-600" />
                    HD Video Walkaround
                  </label>
                </div>

                {editingMachine.videoUrl ? (
                  <div className="space-y-2">
                    <div className="relative rounded-lg overflow-hidden bg-slate-900 border border-amber-300 aspect-video max-h-48 flex items-center justify-center">
                      <video src={editingMachine.videoUrl} controls className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        id="edit-walkaround-video-input"
                        accept="video/*"
                        onChange={handleEditVideoFileSelect}
                        className="hidden"
                      />
                      <label
                        htmlFor="edit-walkaround-video-input"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 font-bold text-xs rounded cursor-pointer"
                      >
                        {isUploadingEditVideo ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Uploading Video...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5 text-amber-600" />
                            <span>Upload New Video File</span>
                          </>
                        )}
                      </label>
                      <button
                        type="button"
                        onClick={() => setEditingMachine({ ...editingMachine, videoUrl: '' })}
                        className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs font-bold rounded cursor-pointer"
                      >
                        Remove Video
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      id="edit-walkaround-video-input"
                      accept="video/*"
                      onChange={handleEditVideoFileSelect}
                      className="hidden"
                    />
                    <label
                      htmlFor="edit-walkaround-video-input"
                      className="w-full flex flex-col items-center justify-center p-5 bg-white hover:bg-amber-50/50 border-2 border-dashed border-amber-300 rounded-xl cursor-pointer transition-colors"
                    >
                      {isUploadingEditVideo ? (
                        <div className="flex items-center gap-2 text-amber-700 font-bold text-xs font-mono">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Uploading Video...</span>
                        </div>
                      ) : (
                        <>
                          <Video className="w-7 h-7 text-amber-500 mb-1.5" />
                          <span className="text-xs font-bold text-gray-900">+ Upload Walkaround Video File</span>
                          <span className="text-[10px] text-gray-500">Select MP4, MOV, or WebM from your device</span>
                        </>
                      )}
                    </label>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-600 mb-0.5">Title</label>
                    <input
                      type="text"
                      value={editingMachine.videoTitle || ''}
                      onChange={(e) => setEditingMachine({ ...editingMachine, videoTitle: e.target.value })}
                      placeholder="e.g. Cat 330D Cold Start Walkaround"
                      className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-600 mb-0.5">Duration</label>
                    <input
                      type="text"
                      value={editingMachine.videoDuration || ''}
                      onChange={(e) => setEditingMachine({ ...editingMachine, videoDuration: e.target.value })}
                      placeholder="e.g. 3:20 min"
                      className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Description</label>
                <textarea
                  value={editingMachine.description || ''}
                  onChange={(e) => setEditingMachine({ ...editingMachine, description: e.target.value })}
                  rows={2}
                  className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-gray-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setEditingMachine(null)}
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#FFB800] hover:bg-[#E5A700] text-slate-950 font-bold rounded cursor-pointer font-heading"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ===================== MODAL: EDIT INQUIRY ===================== */}
      {selectedInquiryForEdit && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-xl max-w-lg w-full p-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="font-heading font-black text-sm uppercase text-gray-900">
                Update Buyer Inquiry & Broker Notes
              </h3>
              <button onClick={() => setSelectedInquiryForEdit(null)} className="text-gray-500 hover:text-gray-900 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500">Machine: </span>
                <strong className="text-gray-900">{selectedInquiryForEdit.machineTitle}</strong>
              </div>
              <div>
                <span className="text-gray-500">Buyer: </span>
                <strong className="text-gray-900">{selectedInquiryForEdit.customerName}</strong> ({selectedInquiryForEdit.customerEmail})
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Workflow Status</label>
                <select
                  value={inquiryStatusInput}
                  onChange={(e) => setInquiryStatusInput(e.target.value as InquiryStatus)}
                  className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-gray-900"
                >
                  <option value="pending">Pending RFQ</option>
                  <option value="quoted">Quoted / Pro-Forma Sent</option>
                  <option value="deposit_paid">Deposit Paid (Wire Confirmed)</option>
                  <option value="dispatched">Dispatched to Port</option>
                  <option value="delivered">Delivered / Completed</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Quoted Price ($USD)</label>
                <input
                  type="number"
                  value={inquiryPriceInput}
                  onChange={(e) => setInquiryPriceInput(Number(e.target.value))}
                  className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-gray-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Internal Dealership Broker Notes</label>
                <textarea
                  value={inquiryNotesInput}
                  onChange={(e) => setInquiryNotesInput(e.target.value)}
                  placeholder="Record wire transfer details, container number, client negotiations..."
                  rows={3}
                  className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-gray-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setSelectedInquiryForEdit(null)}
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveInquiry}
                  className="px-4 py-1.5 bg-[#FFB800] text-slate-950 font-bold rounded cursor-pointer font-heading"
                >
                  Save to MongoDB
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ===================== MODAL: DISPATCH SHIPMENT ===================== */}
      {isDispatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-xl max-w-lg w-full p-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="font-heading font-black text-sm uppercase text-gray-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#FFB800]" />
                Dispatch New Ocean Freight Shipment
              </h3>
              <button onClick={() => setIsDispatchModalOpen(false)} className="text-gray-500 hover:text-gray-900 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateShipmentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Machinery Title</label>
                <input
                  type="text"
                  value={newShipmentMachineTitle}
                  onChange={(e) => setNewShipmentMachineTitle(e.target.value)}
                  placeholder="e.g. Caterpillar D6E Crawler Dozer"
                  required
                  className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-gray-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Buyer Consignee Name</label>
                <input
                  type="text"
                  value={newShipmentBuyerName}
                  onChange={(e) => setNewShipmentBuyerName(e.target.value)}
                  placeholder="e.g. Alex Miller / Apex Global FZE"
                  required
                  className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Destination Seaport</label>
                  <input
                    type="text"
                    value={newShipmentDestination}
                    onChange={(e) => setNewShipmentDestination(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Carrier Line</label>
                  <input
                    type="text"
                    value={newShipmentCarrier}
                    onChange={(e) => setNewShipmentCarrier(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Ocean Bill of Lading / Tracking #</label>
                <input
                  type="text"
                  value={newShipmentTracking}
                  onChange={(e) => setNewShipmentTracking(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-gray-900 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsDispatchModalOpen(false)}
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#FFB800] text-slate-950 font-bold rounded cursor-pointer font-heading"
                >
                  Record & Track Shipment
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ===================== MODAL: DELETE CONFIRMATION ===================== */}
      {deleteModalOpen && deleteTarget && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <h3 className="font-heading font-black text-sm text-gray-900 uppercase">Confirm Delete</h3>
                <p className="text-xs text-gray-500 mt-0.5">This action cannot be undone.</p>
              </div>
            </div>
            <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200">
              <p className="text-sm text-gray-800 font-medium">
                Are you sure you want to permanently delete:
              </p>
              <p className="text-sm font-black text-rose-700 mt-1">"{deleteTarget.label}"</p>
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <button
                onClick={() => { setDeleteModalOpen(false); setDeleteTarget(null); }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL: COUNTER OFFER ===================== */}
      {counterOfferModalOpen && counterOfferTarget && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm text-gray-900 uppercase">Send Counter Offer</h3>
                  <p className="text-xs text-gray-500">Seller is asking <strong className="text-gray-700">${counterOfferTarget.askingPrice.toLocaleString()}</strong></p>
                </div>
              </div>
              <button onClick={() => setCounterOfferModalOpen(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-700 uppercase font-mono">
                Dealership Buyout Offer (USD) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">$</span>
                <input
                  type="number"
                  value={counterOfferValue}
                  onChange={(e) => { setCounterOfferValue(e.target.value); setCounterOfferError(''); }}
                  placeholder="0"
                  min="1"
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  autoFocus
                />
              </div>
              {counterOfferValue && Number(counterOfferValue) > 0 && (
                <div className="text-xs text-gray-500 font-mono">
                  Offering <strong className="text-amber-700">${Number(counterOfferValue).toLocaleString()}</strong>
                  {' '}({Math.round((Number(counterOfferValue) / counterOfferTarget.askingPrice) * 100)}% of asking price)
                </div>
              )}
              {counterOfferError && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {counterOfferError}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-1 border-t border-gray-200">
              <button
                onClick={() => setCounterOfferModalOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCounterOfferSubmit}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-black uppercase rounded-lg cursor-pointer shadow flex items-center gap-2"
              >
                <DollarSign className="w-4 h-4" />
                Send Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL: ADD USER ===================== */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm text-gray-900 uppercase">Create New User Account</h3>
                  <p className="text-xs text-gray-500">Admin-created accounts are verified immediately</p>
                </div>
              </div>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="e.g. Alex Miller"
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Account Role *</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as 'buyer' | 'admin')}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="buyer">🚜 Buyer / Client</option>
                    <option value="admin">👑 Administrator</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Email Address *</label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="user@company.com"
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Password *</label>
                <input
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  required
                  minLength={6}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Company</label>
                  <input
                    type="text"
                    value={newUserCompany}
                    onChange={(e) => setNewUserCompany(e.target.value)}
                    placeholder="Company / Organization"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Phone</label>
                  <input
                    type="text"
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase font-mono mb-1">Country / Region</label>
                <input
                  type="text"
                  value={newUserCountry}
                  onChange={(e) => setNewUserCountry(e.target.value)}
                  placeholder="United States"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {newUserError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{newUserError}</span>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFB800] hover:bg-[#E5A700] text-slate-950 font-black uppercase tracking-wider rounded-lg shadow cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: ADD / EDIT MANUFACTURER ===================== */}
      {isMfrModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm text-gray-900 uppercase">
                    {editingMfr ? 'Edit Equipment Manufacturer' : 'Add New Equipment Manufacturer'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {editingMfr ? `Updating make "${editingMfr.name}" in database` : 'Registers brand across all machine filters & inventory options'}
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsMfrModalOpen(false)} 
                className="text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMfr} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase font-mono mb-1">
                    Manufacturer Name *
                  </label>
                  <input
                    type="text"
                    value={mfrName}
                    onChange={(e) => {
                      setMfrName(e.target.value);
                      if (!editingMfr && (!mfrSlug || mfrSlug === mfrName.toUpperCase())) {
                        setMfrSlug(e.target.value.toUpperCase());
                      }
                    }}
                    placeholder="e.g. Caterpillar, Komatsu"
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase font-mono mb-1">
                    Brand Code / Slug *
                  </label>
                  <input
                    type="text"
                    value={mfrSlug}
                    onChange={(e) => setMfrSlug(e.target.value.toUpperCase())}
                    placeholder="e.g. CATERPILLAR, KOMATSU"
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase font-mono mb-1">
                  Country of Origin / Global HQ
                </label>
                <input
                  type="text"
                  value={mfrCountry}
                  onChange={(e) => setMfrCountry(e.target.value)}
                  placeholder="e.g. United States, Japan, Germany, Sweden"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase font-mono mb-1">
                  Specialties & Description
                </label>
                <textarea
                  value={mfrDescription}
                  onChange={(e) => setMfrDescription(e.target.value)}
                  placeholder="e.g. World leading manufacturer of crawler earthmoving and heavy quarry excavators"
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsMfrModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingMfr}
                  className="px-5 py-2 bg-[#FFB800] hover:bg-[#E5A700] text-slate-950 font-black uppercase tracking-wider rounded-lg shadow cursor-pointer flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSavingMfr ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingMfr ? 'Update Manufacturer' : 'Save Manufacturer'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: ADD / EDIT CATEGORY ===================== */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm text-gray-900 uppercase">
                    {editingCat ? 'Edit Equipment Category' : 'Add New Equipment Product Type'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {editingCat ? `Updating product type "${editingCat.name}" in database` : 'Registers machinery classification across catalog filter tabs'}
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsCatModalOpen(false)} 
                className="text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCat} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase font-mono mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={catName}
                    onChange={(e) => {
                      setCatName(e.target.value);
                      if (!editingCat && (!catSlug || catSlug === catName)) {
                        setCatSlug(e.target.value);
                      }
                    }}
                    placeholder="e.g. Telescopic Handlers, Dozers"
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase font-mono mb-1">
                    System Key / Slug *
                  </label>
                  <input
                    type="text"
                    value={catSlug}
                    onChange={(e) => setCatSlug(e.target.value)}
                    placeholder="e.g. Telehandlers, Dozer"
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase font-mono mb-1">
                  Description / Machinery Class
                </label>
                <textarea
                  value={catDescription}
                  onChange={(e) => setCatDescription(e.target.value)}
                  placeholder="e.g. Multi-stage boom telehandlers for site material placement and container handling"
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingCat}
                  className="px-5 py-2 bg-[#FFB800] hover:bg-[#E5A700] text-slate-950 font-black uppercase tracking-wider rounded-lg shadow cursor-pointer flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSavingCat ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingCat ? 'Update Category' : 'Save Category'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
