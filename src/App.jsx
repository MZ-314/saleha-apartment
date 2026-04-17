import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, MapPin, Wifi, WifiOff, Phone, ArrowLeft, X, Camera, Shield, Car, Clock } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

// ROOM DATA - Edit prices and status here (v=vacant, o=occupied, sv=soon vacant)
const ROOMS_DATA = [
  { id: 'SG-01', floor: 'ground', price: '9000', status: 'o', wifi: true, photos: ['https://placehold.co/800x600/7C3030/white?text=SG-01+Photo+1', 'https://placehold.co/800x600/7C3030/white?text=SG-01+Photo+2', 'https://placehold.co/800x600/7C3030/white?text=SG-01+Photo+3', 'https://placehold.co/800x600/7C3030/white?text=SG-01+Photo+4'], video: '' },
  { id: 'SG-02', floor: 'ground', price: '10000', status: 'o', wifi: true, photos: ['https://placehold.co/800x600/7C3030/white?text=SG-02+Photo+1', 'https://placehold.co/800x600/7C3030/white?text=SG-02+Photo+2', 'https://placehold.co/800x600/7C3030/white?text=SG-02+Photo+3', 'https://placehold.co/800x600/7C3030/white?text=SG-02+Photo+4'], video: '' },
  { id: 'SG-03', floor: 'ground', price: '11000', status: 'o', wifi: true, photos: ['https://res.cloudinary.com/dsnjmkotw/image/upload/v1770176474/IMG_20260204_090047417_wfqfev.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770176475/IMG_20260204_090108567_p62bdi.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770176474/IMG_20260204_090115842_wmtw0f.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770176476/IMG_20260204_090245119_q43tvc.jpg'], video: 'WJ5bBfUX7EI' },
  { id: 'SG-04', floor: 'ground', price: '9000', status: 'o', wifi: true, photos: ['https://res.cloudinary.com/dsnjmkotw/image/upload/v1770427336/IMG_20260207_064349967_dodxsa.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770427336/IMG_20260207_064414583_gh5kr9.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770427336/IMG_20260207_064400639_f3ugjo.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770427337/IMG_20260207_064431129_e6zjyf.jpg'], video: '1Yfo4GKVMS8' },
  { id: 'SG-05', floor: 'ground', price: '6500', status: 'o', wifi: true, photos: ['https://placehold.co/800x600/7C3030/white?text=SG-05+Photo+1', 'https://placehold.co/800x600/7C3030/white?text=SG-05+Photo+2', 'https://placehold.co/800x600/7C3030/white?text=SG-05+Photo+3', 'https://placehold.co/800x600/7C3030/white?text=SG-05+Photo+4'], video: '' },
  
  { id: 'S2-01', floor: 'second', price: '8500', status: 'o', wifi: true, photos: ['https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173869/IMG_20260204_081627307_md9p1o.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173869/IMG_20260204_081633216_gdemfs.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173869/IMG_20260204_081637104_finoar.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173869/IMG_20260204_081641853_mb8ewo.jpg'], video: 'gRPM4Q-jz-0' },
  { id: 'S2-02', floor: 'second', price: '7500', status: 'o', wifi: true, photos: ['https://res.cloudinary.com/dsnjmkotw/image/upload/v1772417762/IMG_20260302_073948687_rg35qz.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1772417763/IMG_20260302_074018766_efyvfs.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1772417763/IMG_20260302_074043183_ezz4gr.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1772417763/IMG_20260302_074034340_po8vnn.jpg'], video: 'cBfLJdxfgyI' },
  { id: 'S2-03', floor: 'second', price: '8000', status: 'o', wifi: true, photos: ['https://placehold.co/800x600/2D5016/white?text=S2-03+Photo+1', 'https://placehold.co/800x600/2D5016/white?text=S2-03+Photo+2', 'https://placehold.co/800x600/2D5016/white?text=S2-03+Photo+3', 'https://placehold.co/800x600/2D5016/white?text=S2-03+Photo+4'], video: '' },
  { id: 'S2-04', floor: 'second', price: '8000', status: 'o', wifi: true, photos: ['https://res.cloudinary.com/dsnjmkotw/image/upload/v1770427547/IMG_20260207_064633106_sqkunv.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770427545/IMG_20260207_064650756_clgluq.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770427546/IMG_20260207_064658348_jqvnj0.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770427546/IMG_20260207_064704983_kpn5qg.jpg'], video: '2b78ZuFYXSU' },
  { id: 'S2-05', floor: 'second', price: '10000', status: 'o', wifi: true, photos: ['https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173546/IMG_20260204_081447512_dftwy4.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173545/IMG_20260204_081454496_srtpzl.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173546/IMG_20260204_081501113_denz2v.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173547/IMG_20260204_081507068_vjifhr.jpg'], video: 'FS6DantgjOM' },
  { id: 'S2-06', floor: 'second', price: '9000', status: 'v', wifi: true, photos: ['https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173699/IMG_20260204_081535530_y41yfu.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173699/IMG_20260204_081542331_zbkj7b.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173700/IMG_20260204_081546680_c0bpmf.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173701/IMG_20260204_081550098_c5stoz.jpg'], video: 'W4NETLXus0U' },
  { id: 'S2-07', floor: 'second', price: '7000', status: 'o', wifi: true, photos: ['https://placehold.co/800x600/2D5016/white?text=S2-07+Photo+1', 'https://placehold.co/800x600/2D5016/white?text=S2-07+Photo+2', 'https://placehold.co/800x600/2D5016/white?text=S2-07+Photo+3', 'https://placehold.co/800x600/2D5016/white?text=S2-07+Photo+4'], video: '' },
];

const WHATSAPP_NUMBER = '+919365223052';
const HERO_IMAGE_URL = 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1769305240/heroimage_jnt59v.jpg';

// Apartment photos for About section
const APARTMENT_PHOTOS = [
  'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770883974/IMG_20260212_133640087_oujnjx.jpg',
  'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770883977/IMG_20260212_133902861_bwrqjw.jpg',
  'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770883969/IMG_20260212_133645036_bilagw.jpg',
  'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770883974/IMG_20260212_133554882_ylyh4p.jpg',
  'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770883973/IMG_20260212_133807731_p7vg7g.jpg',
  'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770883975/IMG_20260212_133813931_ya9pzg.jpg',
  'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770883976/IMG_20260212_133834418_wj9cge.jpg',
  'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770883972/IMG_20260212_133731586_tdkroi.jpg',
  'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770883969/IMG_20260212_133745992_vwmsn9.jpg'
];

const TAGLINES = [
  "Comfortable rooms with modern amenities in a prime location.",
  "In the heart of where you want to be.",
  "Find your perfect fit.",
  "Settle in with us."
];

const TypingTagline = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentTagline = TAGLINES[taglineIndex];
    const typingSpeed = isDeleting ? 30 : 50;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentTagline.length) {
          setDisplayText(currentTagline.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 4000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentTagline.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTaglineIndex((taglineIndex + 1) % TAGLINES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, taglineIndex]);

  return (
    <p className="text-xl opacity-90 max-w-2xl mx-auto h-16 flex items-center justify-center">
      {displayText}
      <span className="animate-pulse ml-1">|</span>
    </p>
  );
};

const StatusBadge = ({ status }) => {
  const configs = {
    v: { text: 'Vacant', bg: 'bg-green-600', textColor: 'text-white' },
    o: { text: 'Occupied', bg: 'bg-red-600', textColor: 'text-white' },
    sv: { text: 'Soon Vacant', bg: 'bg-yellow-600', textColor: 'text-white' }
  };
  
  const config = configs[status] || configs.v;
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.textColor}`}>
      {config.text}
    </span>
  );
};

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(`/room/${room.id}`)}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={room.photos[0]} 
          alt={`Room ${room.id}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <StatusBadge status={room.status} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Room {room.id}</h3>
        <div className="flex items-center justify-between mb-3">
          <p className="text-3xl font-bold text-green-700">₹{room.price}<span className="text-sm text-gray-500">/mo</span></p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          {room.wifi ? (
            <><Wifi size={18} className="text-green-600" /> <span className="text-sm">WiFi Available</span></>
          ) : (
            <><WifiOff size={18} className="text-gray-400" /> <span className="text-sm">No WiFi</span></>
          )}
        </div>
      </div>
    </div>
  );
};

const Lightbox = ({ photos, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [slideDirection, setSlideDirection] = useState('');

  const goToPrevious = () => {
    setSlideDirection('left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
      setSlideDirection('');
    }, 150);
  };

  const goToNext = () => {
    setSlideDirection('right');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
      setSlideDirection('');
    }, 150);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    trackMouse: false
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
      >
        <X size={32} />
      </button>

      <div 
        className="relative w-full h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        {...handlers}
      >
        <div className="relative flex-1 flex items-center justify-center w-full max-w-6xl">
          <img
            src={photos[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            className={`max-h-[70vh] max-w-full object-contain transition-all duration-150 ${
              slideDirection === 'left' ? 'translate-x-full opacity-0' :
              slideDirection === 'right' ? '-translate-x-full opacity-0' :
              'translate-x-0 opacity-100'
            }`}
          />

          {photos.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full text-white">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto max-w-full px-4">
          {photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`Thumbnail ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded cursor-pointer transition ${
                idx === currentIndex ? 'ring-4 ring-green-500' : 'opacity-50 hover:opacity-100'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PhotoGallery = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    trackMouse: false
  });

  return (
    <>
      <div className="relative">
        <div 
          className="relative h-96 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
          {...handlers}
          onClick={() => setLightboxOpen(true)}
        >
          <img 
            src={photos[currentIndex]} 
            alt={`Photo ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {photos.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
              >
                <ChevronRight size={24} />
              </button>
              
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                {currentIndex + 1} / {photos.length}
              </div>
            </>
          )}
        </div>
        
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {photos.map((photo, idx) => (
            <img 
              key={idx}
              src={photo}
              alt={`Thumbnail ${idx + 1}`}
              onClick={() => { setCurrentIndex(idx); setLightboxOpen(true); }}
              className={`w-20 h-20 object-cover rounded cursor-pointer transition ${
                idx === currentIndex ? 'ring-4 ring-green-600' : 'opacity-60 hover:opacity-100'
              }`}
            />
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          photos={photos}
          initialIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
};

const RoomDetailPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = ROOMS_DATA.find(r => r.id === roomId);

  if (!room) {
    return <div>Room not found</div>;
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Hey, I want to book the room ${room.id}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-900 to-green-800 text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mb-4 hover:underline"
          >
            <ArrowLeft size={20} /> Back to Homepage
          </button>
          <h1 className="text-4xl font-bold">Room {room.id}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <PhotoGallery photos={room.photos} />
            
            {room.video && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-3">Room Video Tour</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${room.video}`}
                    title="Room video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <div className="mb-6">
                <StatusBadge status={room.status} />
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-2">Monthly Rent</p>
                <p className="text-5xl font-bold text-green-700">₹{room.price}</p>
              </div>

              <div className="space-y-4 mb-6 border-t pt-6">
                <div className="flex items-center gap-3">
                  <Home className="text-maroon-600" size={24} />
                  <div>
                    <p className="font-semibold">Attached Bathroom</p>
                    <p className="text-sm text-gray-600">Private bathroom in room</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {room.wifi ? (
                    <>
                      <Wifi className="text-green-600" size={24} />
                      <div>
                        <p className="font-semibold">WiFi Available</p>
                        <p className="text-sm text-gray-600">₹50/person/month</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <WifiOff className="text-gray-400" size={24} />
                      <div>
                        <p className="font-semibold">WiFi Coming Soon</p>
                        <p className="text-sm text-gray-600">Available for 2nd floor currently</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-red-700" size={24} />
                  <div>
                    <p className="font-semibold">{room.floor === 'ground' ? 'Ground Floor' : 'Second Floor'}</p>
                    <p className="text-sm text-gray-600">Saleha Apartment</p>
                  </div>
                </div>
              </div>

              {room.status !== 'o' && (
                <button 
                  onClick={openWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition transform hover:scale-105"
                >
                  <Phone size={24} />
                  Book via WhatsApp
                </button>
              )}

              {room.status === 'o' && (
                <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg text-center">
                  This room is currently occupied
                </div>
              )}

              <p className="text-sm text-gray-500 text-center mt-4">
                Unfurnished room • Tiled-floor bathroom
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
const activeTab = location.hash === '#rooms' ? 'rooms' : 'about';

const switchTab = (tab) => {
  navigate(tab === 'rooms' ? '#rooms' : '/');
};

  const groundFloorRooms = ROOMS_DATA.filter(r => r.floor === 'ground');
  const secondFloorRooms = ROOMS_DATA.filter(r => r.floor === 'second');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-red-900 text-yellow-400 overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_IMAGE_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-red-900 opacity-75"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4">Saleha Apartment</h1>
          <div className="flex items-center justify-center gap-2 text-xl mb-6">
            <MapPin size={24} />
            <a 
              href="https://maps.app.goo.gl/gXozZJ8Fg7GzBAgV8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline hover:text-green-300 transition"
            >
              Katahbari, Nizarapar Path, House No-91, Guwahati-35 (Click to open in maps)
            </a>
          </div>
          <TypingTagline />
        </div>
      </div>

      {/* Sticky Tab Navigation */}
      <div className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => switchTab('about')}
              className={`flex-1 py-4 font-semibold text-lg transition ${
                activeTab === 'about'
                  ? 'text-green-700 border-b-4 border-green-700'
                  : 'text-gray-600 hover:text-gray-800 border-b-4 border-transparent'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => switchTab('rooms')}
              className={`flex-1 py-4 font-semibold text-lg transition ${
                activeTab === 'rooms'
                  ? 'text-green-700 border-b-4 border-green-700'
                  : 'text-gray-600 hover:text-gray-800 border-b-4 border-transparent'
              }`}
            >
              Rooms
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'about' && (
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* About Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-8 border-red-900 pl-4">About Saleha Apartment</h2>
            <div className="prose max-w-none text-gray-700 space-y-4 mb-8">
              <p className="text-lg leading-relaxed">
                Saleha Apartment, newly renovated in 2021, is at a prime location and close to several offices and institutes. With affordable pricing and tiled-floor bathroom-attached rooms, it remains the preferred choice of several RGU students and several employees of offices in and around Garchuk.
              </p>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-8 border-red-900 pl-4">Rent and other bills</h2>
            <div className="prose max-w-none text-gray-700 space-y-4 mb-8">
              <p className="text-lg leading-relaxed">
                The rent mentioned with the rooms covers water bill and garbage bill along with the rent. The electricity bill will be charged separately according to the usage reflected on the meters. Tenants in both the second floor and first floor can opt for wi-fi and the bill for wi-fi will depend on the number of people in one room. If a room has 3 people, then the wi-fi bill per month for that room would 3X50=150/-. So in essence, we are charging only Rs 50/- per person for full unlimited internet per month.
              </p>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-8 border-red-900 pl-4">Facilities provided</h2>
            <div className="prose max-w-none text-gray-700 space-y-4 mb-8">
              <p className="text-lg leading-relaxed">
                The apartment provides free parking for two-wheelers to all its tenants. Tenants with four-wheelers can park right outside the apartment without any worries. Along with parking space, we also have CCTV cameras with 24 hour surveillance all around and in the apartment, promising full security to the tenants. We have already mentioned the wi-fi facility which is available in all rooms.
              </p>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-8 border-red-900 pl-4">Rules and Regulations</h2>
            <div className="prose max-w-none text-gray-700 space-y-4 mb-8">
              <p className="text-lg leading-relaxed">
                Our apartment has some major rules that the tenants need to follow. We need to clarify that the rooms are not completely independent. We make sure of who goes in and who goes out. We don't allow unmarried couples strictly. if a male student is seen to have brought a female companion which he is not married to, we will have to take strict action. Similarly, if a female student is seen to have brought a male companion which she is not married to, the same procedure follows. We want peaceful tenants that don't create a ruckus, keeps the room clean, and pays the rent on time. Before booking the room, make sure to prepare the right documents like Aadhar Card, student id (if applicable), employee id (if applicable), etc. The gate is closed every night at around 10:30 PM. We will appreciate that all the tenants are home by that time.
              </p>
            </div>

            {/* Apartment Photos Gallery */}
            <div className="grid md:grid-cols-1 gap-4 mb-8">
              {APARTMENT_PHOTOS.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`Apartment ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              ))}
            </div>

            {/* Key Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <Shield className="text-red-900 mb-3" size={40} />
                <h3 className="font-bold text-lg mb-2">24/7 Security</h3>
                <p className="text-sm text-gray-600">CCTV surveillance throughout</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <Car className="text-green-700 mb-3" size={40} />
                <h3 className="font-bold text-lg mb-2">Free Parking</h3>
                <p className="text-sm text-gray-600">Two-wheeler parking for all tenants</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <Wifi className="text-blue-600 mb-3" size={40} />
                <h3 className="font-bold text-lg mb-2">WiFi Available</h3>
                <p className="text-sm text-gray-600">₹50/person unlimited internet</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <Clock className="text-purple-600 mb-3" size={40} />
                <h3 className="font-bold text-lg mb-2">Prime Location</h3>
                <p className="text-sm text-gray-600">Close to RGU & offices</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rooms' && (
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Ground Floor Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 border-l-8 border-red-900 pl-4">Ground Floor Rooms</h2>
            <p className="text-gray-600 pl-4">5 rooms available on the ground floor</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {groundFloorRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          {/* Second Floor Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 border-l-8 border-green-800 pl-4">Second Floor Rooms</h2>
            <p className="text-gray-600 pl-4">7 rooms available with WiFi on the second floor</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {secondFloorRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg mb-4">Contact us for bookings and inquiries</p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105"
            >
              <Phone size={20} />
              WhatsApp
            </a>
            <a 
              href={`tel:${WHATSAPP_NUMBER}`}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105"
            >
              <Phone size={20} />
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:roomId" element={<RoomDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}