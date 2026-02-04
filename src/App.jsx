import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, MapPin, Wifi, WifiOff, Phone, ArrowLeft } from 'lucide-react';

// ROOM DATA - Edit prices and status here (v=vacant, o=occupied, sv=soon vacant)
const ROOMS_DATA = [
  // Ground Floor Rooms (no WiFi)
  { id: 'SG-01', floor: 'ground', price: '9000', status: 'o', wifi: false, photos: ['https://placehold.co/800x600/7C3030/white?text=SG-01+Photo+1', 'https://placehold.co/800x600/7C3030/white?text=SG-01+Photo+2', 'https://placehold.co/800x600/7C3030/white?text=SG-01+Photo+3', 'https://placehold.co/800x600/7C3030/white?text=SG-01+Photo+4'], video: '' },
  { id: 'SG-02', floor: 'ground', price: '10000', status: 'o', wifi: false, photos: ['https://placehold.co/800x600/7C3030/white?text=SG-02+Photo+1', 'https://placehold.co/800x600/7C3030/white?text=SG-02+Photo+2', 'https://placehold.co/800x600/7C3030/white?text=SG-02+Photo+3', 'https://placehold.co/800x600/7C3030/white?text=SG-02+Photo+4'], video: '' },
  { id: 'SG-03', floor: 'ground', price: '12000', status: 'v', wifi: false, photos: ['https://res.cloudinary.com/dsnjmkotw/image/upload/v1770176474/IMG_20260204_090047417_wfqfev.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770176475/IMG_20260204_090108567_p62bdi.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770176474/IMG_20260204_090115842_wmtw0f.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770176476/IMG_20260204_090245119_q43tvc.jpg'], video: 'WJ5bBfUX7EI' },
  { id: 'SG-04', floor: 'ground', price: '9000', status: 'o', wifi: false, photos: ['https://placehold.co/800x600/7C3030/white?text=SG-04+Photo+1', 'https://placehold.co/800x600/7C3030/white?text=SG-04+Photo+2', 'https://placehold.co/800x600/7C3030/white?text=SG-04+Photo+3', 'https://placehold.co/800x600/7C3030/white?text=SG-04+Photo+4'], video: '' },
  { id: 'SG-05', floor: 'ground', price: '6500', status: 'o', wifi: false, photos: ['https://placehold.co/800x600/7C3030/white?text=SG-05+Photo+1', 'https://placehold.co/800x600/7C3030/white?text=SG-05+Photo+2', 'https://placehold.co/800x600/7C3030/white?text=SG-05+Photo+3', 'https://placehold.co/800x600/7C3030/white?text=SG-05+Photo+4'], video: '' },
  
  // Second Floor Rooms (all have WiFi)
  { id: 'S2-01', floor: 'second', price: '8000', status: 'v', wifi: true, photos: ['https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173869/IMG_20260204_081627307_md9p1o.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173869/IMG_20260204_081633216_gdemfs.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173869/IMG_20260204_081637104_finoar.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173869/IMG_20260204_081641853_mb8ewo.jpg'], video: 'gRPM4Q-jz-0' },
  { id: 'S2-02', floor: 'second', price: '7500', status: 'o', wifi: true, photos: ['https://placehold.co/800x600/2D5016/white?text=S2-02+Photo+1', 'https://placehold.co/800x600/2D5016/white?text=S2-02+Photo+2', 'https://placehold.co/800x600/2D5016/white?text=S2-02+Photo+3', 'https://placehold.co/800x600/2D5016/white?text=S2-02+Photo+4'], video: '' },
  { id: 'S2-03', floor: 'second', price: '8000', status: 'o', wifi: true, photos: ['https://placehold.co/800x600/2D5016/white?text=S2-03+Photo+1', 'https://placehold.co/800x600/2D5016/white?text=S2-03+Photo+2', 'https://placehold.co/800x600/2D5016/white?text=S2-03+Photo+3', 'https://placehold.co/800x600/2D5016/white?text=S2-03+Photo+4'], video: '' },
  { id: 'S2-04', floor: 'second', price: '8000', status: 'o', wifi: true, photos: ['https://placehold.co/800x600/2D5016/white?text=S2-04+Photo+1', 'https://placehold.co/800x600/2D5016/white?text=S2-04+Photo+2', 'https://placehold.co/800x600/2D5016/white?text=S2-04+Photo+3', 'https://placehold.co/800x600/2D5016/white?text=S2-04+Photo+4'], video: '' },
  { id: 'S2-05', floor: 'second', price: '10000', status: 'v', wifi: true, photos: ['https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173546/IMG_20260204_081447512_dftwy4.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173545/IMG_20260204_081454496_srtpzl.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173546/IMG_20260204_081501113_denz2v.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173547/IMG_20260204_081507068_vjifhr.jpg'], video: 'FS6DantgjOM' },
  { id: 'S2-06', floor: 'second', price: '9000', status: 'v', wifi: true, photos: ['https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173699/IMG_20260204_081535530_y41yfu.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173699/IMG_20260204_081542331_zbkj7b.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173700/IMG_20260204_081546680_c0bpmf.jpg', 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1770173701/IMG_20260204_081550098_c5stoz.jpg'], video: 'W4NETLXus0U' },
  { id: 'S2-07', floor: 'second', price: '7000', status: 'o', wifi: true, photos: ['https://placehold.co/800x600/2D5016/white?text=S2-07+Photo+1', 'https://placehold.co/800x600/2D5016/white?text=S2-07+Photo+2', 'https://placehold.co/800x600/2D5016/white?text=S2-07+Photo+3', 'https://placehold.co/800x600/2D5016/white?text=S2-07+Photo+4'], video: '' },
];

const WHATSAPP_NUMBER = '+919365223052';

// Hero background image URL - Replace this with your Cloudinary URL
const HERO_IMAGE_URL = 'https://res.cloudinary.com/dsnjmkotw/image/upload/v1769305240/heroimage_jnt59v.jpg';

// Taglines that will rotate with typing animation
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
    const typingSpeed = isDeleting ? 30 : 50; // Faster typing

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (charIndex < currentTagline.length) {
          setDisplayText(currentTagline.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 4000); // Wait 4 seconds
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setDisplayText(currentTagline.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Finished deleting, move to next tagline
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

const PhotoGallery = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
        <img 
          src={photos[currentIndex]} 
          alt={`Photo ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {photos.length > 1 && (
          <>
            <button 
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={goToNext}
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
            onClick={() => setCurrentIndex(idx)}
            className={`w-20 h-20 object-cover rounded cursor-pointer transition ${
              idx === currentIndex ? 'ring-4 ring-green-600' : 'opacity-60 hover:opacity-100'
            }`}
          />
        ))}
      </div>
    </div>
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
            <ArrowLeft size={20} /> Back to All Rooms
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
                        <p className="text-sm text-gray-600">High-speed internet included</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <WifiOff className="text-gray-400" size={24} />
                      <div>
                        <p className="font-semibold">WiFi Not Included</p>
                        <p className="text-sm text-gray-600">Can be arranged separately</p>
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
                Unfurnished room ready for move-in
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const groundFloorRooms = ROOMS_DATA.filter(r => r.floor === 'ground');
  const secondFloorRooms = ROOMS_DATA.filter(r => r.floor === 'second');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div 
        className="relative bg-red-900 text-yellow-400 overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_IMAGE_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Maroon overlay */}
        <div className="absolute inset-0 bg-red-900 opacity-75"></div>
        
        {/* Content */}
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
              Katahbari, Nizarapar Path, House No-91, Guwahati-35
            </a>
          </div>
          <TypingTagline />
        </div>
      </div>

      {/* Ground Floor Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
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