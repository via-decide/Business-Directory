import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rawBusinesses = [
  { name: 'Salon 2 The Family Salon & Tattoo Studio', slug: 'salon-2-gandhidham', category: 'salons', idea: 6, area: 'Sector 8, Gandhidham', address: 'Shop No.19, Ground Floor, Golden Arcade, Oslo Road, Sector 8, Gandhidham - 370201', phone: '8460513709', email: '' },
  { name: 'De Mayra Collections', slug: 'de-mayra-collections', category: 'salons', idea: 6, area: 'Sector 10, Gandhidham', address: 'Plot No 18, Unit 1 and 2, Ward 7B, Sector 10, Gandhidham - 370201', phone: '8401155916', email: '' },
  { name: 'Skywings Job Placement & Accounts Service', slug: 'skywings-gandhidham', category: 'it-tech', idea: 7, area: 'Sector 7, Gandhidham', address: 'T-6, Plot No. 32, Sector-7, Gandhidham Sector 1, Gandhidham - 370201', phone: '', email: 'support@skywingsadvisors.com' },
  { name: 'Dishaa Consultancy', slug: 'dishaa-consultancy', category: 'it-tech', idea: 7, area: 'Kutch Kala Road, Gandhidham', address: 'Plot No.216, Ward 12/B, Kutch Kala Road, Gandhidham Sector 1, Gandhidham - 370201', phone: '', email: '' },
  { name: 'N R Infotech', slug: 'nr-infotech-gandhidham', category: 'it-tech', idea: 8, area: 'Gandhidham Sector 1', address: 'Gandhidham Sector 1, Gandhidham - 370201', phone: '', email: '' },
  { name: 'Great Peripherals', slug: 'great-peripherals-gandhidham', category: 'it-tech', idea: 8, area: 'Gandhidham Sector 1', address: 'Dbz S-106 Ground Floor, Gandhidham Sector 1, Gandhidham - 370201', phone: '', email: '' },
  { name: 'Nilesh Buch & Associates', slug: 'nilesh-buch-associates', category: 'cas', idea: 9, area: 'Oslo Road, Gandhidham', address: 'SF-208, Golden Arcade, Plot 141-142, Sector-8, Oslo Road, Gandhidham - 370201', phone: '', email: 'nileshbuch@yahoo.com.sg', ownerName: 'Nilesh Y Buch' },
  { name: 'R J Mehta & Co', slug: 'rj-mehta-co', category: 'cas', idea: 9, area: 'Kutch Kala Road, Gandhidham', address: 'Ply Zone Bldg Plot 211, Kutch Kala Road, Gandhidham Sector 1, Gandhidham - 370201', phone: '', email: '', ownerName: 'Rakesh R Mehta' },
  { name: 'Shree Ganesh Photos', slug: 'shree-ganesh-photos', category: 'events', idea: 10, area: 'Bharat Nagar, Gandhidham', address: 'Gurukrupa Society, Bharat Nagar, Gandhidham - 370201', phone: '8460382852', email: '' },
  { name: 'Drashya Glamour Studio & Four Seasons Events', slug: 'drashya-glamour-studio', category: 'events', idea: 10, area: 'Oslo Circle, Gandhidham', address: 'Gaytri Mandir Road, Near Oslo Circle, Gandhidham Sector 1, Gandhidham - 370201', phone: '', email: '' },
  { name: 'Trylo Inner Luxury', slug: 'trylo-inner-luxury', category: 'general', idea: 11, area: 'Sector 1A, Gandhidham', address: 'Plot No 11, Near Kutch Kala Road, Opposite Gokul Sweet, Sector No 1A, Gandhidham - 370201', phone: '', email: '' },
  { name: 'Chat Ka Chaska Restaurant', slug: 'chat-ka-chaska', category: 'general', idea: 11, area: 'Shivaji Park, Gandhidham', address: 'Opposite Shivaji Park, Gandhidham', phone: '', email: '' },
  { name: 'Aaradhana Hospitality Services', slug: 'aaradhana-hospitality', category: 'pg-hostel', idea: 12, area: 'GIDC Road, Adipur', address: 'Boys Hostel Tolani College, GIDC Road Adipur, Gandhidham - 370205', phone: '', email: '' },
  { name: 'Suvidha PG & Accommodation', slug: 'suvidha-pg', category: 'pg-hostel', idea: 12, area: 'Gandhidham HO', address: "Corporate Park, Opp. Arjan's Mall, Gandhidham HO, Gandhidham - 370201", phone: '', email: '' },
  { name: 'Vinod Electrical Solutions', slug: 'vinod-electrical-solutions', category: 'general', idea: 13, area: 'Adipur, Gandhidham', address: 'House No.15, Plot No.161/162, Reliance Society, Near Balaji Super Market, Adipur, Gandhidham - 370205', phone: '9725367411', email: '' },
  { name: 'Patel Plumber Works', slug: 'patel-plumber-works', category: 'general', idea: 13, area: 'Oslo Road, Gandhidham', address: 'Bhim Market, Oslo Road, Opposite Golden Arcade, Gandhidham Sector 1, Gandhidham - 370201', phone: '', email: '' },
  { name: 'The Shiv Regency', slug: 'shiv-regency-gandhidham', category: 'events', idea: 14, area: 'Ward 12/B, Gandhidham', address: '360, Ward 12/B, Gandhidham - 370201', phone: '', email: 'theshivregency@shivhotels.com' },
  { name: 'Anchor Rahul Budhani', slug: 'anchor-rahul-budhani', category: 'events', idea: 14, area: 'Station Road, Gandhidham', address: 'B-306, Raj Plaza, Station Road, Mahatma Gandhi Road, Gandhidham - 370201', phone: '', email: '' },
  { name: 'Maniifest HR Consultancy Pvt Ltd', slug: 'maniifest-hr-consultancy', category: 'it-tech', idea: 15, area: 'Sathwara Colony, Gandhidham', address: 'Plot No 479, Sector No 5, Sathwara Colony, Gandhidham - 370201', phone: '', email: 'maniifestempoweringsolutions@gmail.com', ownerName: 'Amit Mukeshbhai Danani' },
  { name: 'Bharat HR Solutions & Consultancy', slug: 'bharat-hr-solutions', category: 'it-tech', idea: 15, area: 'Kanchan Complex, Gandhidham', address: 'Office No.02, First Floor, Kanchan Complex Kutchkala, Gandhidham - 370201', phone: '', email: '', ownerName: 'Vadecha Bharat' },
  { name: 'Pink Daisy Boutique', slug: 'pink-daisy-adipur', category: 'salons', idea: 6, area: 'Adipur', address: 'Opposite Prabhudharshan Hall, Adipur', phone: '8156081561', email: '', ownerName: 'Ashokbhai Motiyani' },
  { name: 'The Metro Hair & Beauty', slug: 'metro-hair-beauty-adipur', category: 'salons', idea: 6, area: 'Ward 4/B, Adipur', address: 'Shop No 3, Plot No 310, Ward 4/B, Adipur', phone: '7984669391', email: '' },
  { name: 'Wellisa Salon & Nails', slug: 'wellisa-salon-adipur', category: 'salons', idea: 6, area: 'Rotry Circle, Adipur', address: 'Friends Square, Ground Floor, Near Rotry Circle, Adipur', phone: '', email: '' },
  { name: 'Satyabhama Job Consultants', slug: 'satyabhama-job-consultants-adipur', category: 'it-tech', idea: 7, area: 'Near Maitri School, Adipur', address: 'Near Maitri School, Adipur', phone: '', email: '', note: 'Placement agency serving BPO, FMCG, and IT sectors.' },
  { name: 'MAD Networks Pvt Ltd', slug: 'mad-networks-adipur', category: 'it-tech', idea: 7, area: 'Adipur', address: 'Adipur', phone: '', email: '', note: 'Placement agency focused on architecture, aviation, and manufacturing roles.' },
  { name: 'Krishna Manpower Supply', slug: 'krishna-manpower-adipur', category: 'it-tech', idea: 7, area: 'Adipur', address: 'Adipur', phone: '', email: '', note: 'Recruitment consultant and domestic placement company.' },
  { name: 'Acme Computing Services', slug: 'acme-computing-adipur', category: 'it-tech', idea: 8, area: 'Adipur', address: 'Jalaram Mandir Road, Adipur', phone: '', email: '', ownerName: 'Nitesh Punjani' },
  { name: 'M K Soft Service', slug: 'mk-soft-service-adipur', category: 'it-tech', idea: 8, area: 'DC 5, Adipur', address: 'Shivani B Building, DC 5, Adipur', phone: '', email: '' },
  { name: 'Shadofax Technologies Pvt Ltd', slug: 'shadofax-technologies', category: 'it-tech', idea: 8, area: 'Rambhagh Road, Adipur', address: 'Plot No.319 4b, Rambhagh Road, Adipur', phone: '', email: '' },
  { name: 'Kpt & Co', slug: 'kpt-co-adipur', category: 'cas', idea: 9, area: 'Ward 3b, Adipur', address: '256, Om Mandir, Ward 3b, Adipur', phone: '', email: '' },
  { name: 'JB Photo Studio', slug: 'jb-photo-studio-adipur', category: 'events', idea: 10, area: 'Golden City, Adipur', address: 'Gold Star Complex, Golden City, Ward 1a, Adipur', phone: '', email: '' },
  { name: 'Chheda Decorators', slug: 'chheda-decorators-adipur', category: 'events', idea: 10, area: 'Behind DPS School, Adipur', address: 'Malyalmanorama Nagar, Behind DPS School, Adipur', phone: '', email: '' },
  { name: 'Tongue Twister The Garden Restaurant', slug: 'tongue-twister-adipur', category: 'general', idea: 11, area: 'Ward 6, Adipur', address: 'Ward 6, Adipur', phone: '', email: '' },
  { name: "Vidhu's Treat", slug: 'vidhus-treat-adipur', category: 'general', idea: 11, area: 'Ward 5B, Adipur', address: 'Plot No.3, Ward 5B, Opposite S P Office DC 5, Adipur', phone: '', email: '' },
  { name: 'Matka House Restaurant', slug: 'matka-house-adipur', category: 'general', idea: 11, area: 'Rambaug Road, Adipur', address: 'Plot 25, Ward 6C, Rambaug Road, Adipur', phone: '', email: '' },
  { name: 'Pragati Girls PG', slug: 'pragati-girls-pg', category: 'pg-hostel', idea: 12, area: 'Maitri School, Adipur', address: '108, Ashram Road, Near Maitri School, Ward 2A, Adipur', phone: '', email: '' },
  { name: 'Yuva Sharthi PG', slug: 'yuva-sharthi-pg', category: 'pg-hostel', idea: 12, area: 'Goldencity, Adipur', address: 'Sidhheswar Residency, Goldencity, Adipur', phone: '', email: '' },
  { name: 'Pooja PG', slug: 'pooja-pg-adipur', category: 'pg-hostel', idea: 12, area: 'Adipur', address: 'Adipur', phone: '', email: '', note: 'Girls PG accommodation lead in Adipur.' },
  { name: 'Deepak Plumber', slug: 'deepak-plumber-adipur', category: 'general', idea: 13, area: 'Adipur', address: 'Adipur Hanuman Road, Adipur', phone: '', email: '' },
  { name: 'Uma Enterprise', slug: 'uma-enterprise-adipur', category: 'general', idea: 13, area: 'Bhagirath Nagar, Adipur', address: 'Plot No.474, Bhagirath Nagar, Adipur', phone: '', email: '' },
  { name: 'DPT Exhibition Ground', slug: 'dpt-exhibition-adipur', category: 'events', idea: 14, area: 'Adipur', address: 'DPT Exhibition Ground, Adipur', phone: '', email: '' },
  { name: 'Khavda Events', slug: 'khavda-events-adipur', category: 'events', idea: 14, area: 'Meghpar, Adipur', address: 'Plot No.500, Meghpar, Adipur', phone: '', email: '' },
  { name: 'Cheesy Events', slug: 'cheesy-events-adipur', category: 'events', idea: 14, area: 'Near Iscon Mandir, Adipur', address: 'Mangleshwar Nagar, Near Iscon Mandir, Adipur', phone: '', email: '' },
  { name: 'Etrnity Solutions', slug: 'etrnity-solutions-adipur', category: 'it-tech', idea: 15, area: 'Meghpar-Kumbharani, Adipur', address: '29, Sidheshwar Park, Meghpar-Kumbharani, Adipur', phone: '', email: '' },
  { name: 'Rightfithr Solutions', slug: 'rightfithr-solutions-adipur', category: 'it-tech', idea: 15, area: 'Rambag Road, Adipur', address: '4B, Rambag Road, Adipur', phone: '', email: '' },
  { name: 'Sumit Collection', slug: 'sumit-collection-shinay', category: 'salons', idea: 6, area: 'Mithila 2, Shinay', address: 'Near Sarda Vidya Mandir Primary School, Mithila 2, Shinay', phone: '', email: '' },
  { name: 'Visanjhi Enterprise', slug: 'visanjhi-enterprise-shinay', category: 'it-tech', idea: 15, area: 'Shinay Road, Kachchh', address: '227 New Society, 1 Shinay Road, Shinay Kachchh', phone: '', email: '' },
  { name: 'Ekankotri', slug: 'ekankotri-shinay', category: 'it-tech', idea: 8, area: 'Ward 1, Shinay', address: 'Ward Number 1, Shop No 1, Shinay', phone: '', email: '' },
  { name: 'Shiv Sanket Blooming Lifestyle', slug: 'shiv-sanket-shinay', category: 'general', idea: 11, area: 'Shinay', address: 'Shinay, Kachchh', phone: '', email: '' },
  { name: 'Shiv Fabrication', slug: 'shiv-fabrication-shinay', category: 'general', idea: 11, area: 'Antarjaal, Shinay', address: 'Shop No 11, Shinay, Antarjaal', phone: '', email: '' },
  { name: 'Madhav Hardware', slug: 'madhav-hardware-shinay', category: 'general', idea: 11, area: 'Antarjal Shinay Road', address: 'Sudamapuri Plot No 26, Antarjal Shinay Road', phone: '', email: '' },
  { name: 'Shree Ram Hardware Plumbers', slug: 'shree-ram-hardware-sinay', category: 'general', idea: 13, area: 'Adipur Sinay Road', address: 'Gurukrupa Complex, Adipur Sinay Road', phone: '', email: '' },
  { name: 'Navkar Events', slug: 'navkar-events-shinay', category: 'events', idea: 14, area: 'Ward 3/B, Shinay', address: 'Ward 3/B, Plot No 100, Shinay', phone: '', email: '' },
  { name: 'BDH Party Lawns Ramada', slug: 'bdh-party-lawns-shinay', category: 'events', idea: 14, area: 'Adipur Mundra Highway, Shinay', address: 'Adipur Mundra Highway, Shinay', phone: '', email: '', town: 'Shinay' },
  { name: 'Ramada by Wyndham Gandhidham', slug: 'ramada-wyndham-shinay', category: 'events', idea: 14, area: 'Adipur Mundra Highway, Shinay', address: 'Adipur Mundra Highway, Shinay - 370205', phone: '', email: '', town: 'Shinay' },
  { name: 'Narayan Infotech', slug: 'narayan-infotech-anjar', category: 'it-tech', idea: 8, area: 'Ravechi Circle, Anjar', address: '1st Floor, Shivam Complex, Near Ravechi Circle, Anjar - 370110', phone: '', email: '', town: 'Anjar', note: 'Anjar technology-services lead added to expand town coverage in the directory.' },
  { name: 'Bhachau Guest House', slug: 'bhachau-guest-house', category: 'pg-hostel', idea: 12, area: 'Station Road, Bhachau', address: 'Plot No.12, Station Road, Bhachau - 370140', phone: '', email: '', town: 'Bhachau', note: 'Bhachau accommodation listing added to broaden the district-wide directory rollout.' },
  { name: 'The Fab Tales', slug: 'the-fab-tales-bhuj', category: 'salons', idea: 6, town: 'Bhuj', area: 'Sanskar Nagar, Bhuj', address: 'Mangalam Ground Floor, Sanskar Nagar, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'White Hair Care', slug: 'white-hair-care-bhuj', category: 'salons', idea: 6, town: 'Bhuj', area: 'Ghanshyam Nagar, Bhuj', address: 'Near Anand Hotel, Ghanshyam Nagar, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Gems Hairs Studio', slug: 'gems-hairs-studio-bhuj', category: 'salons', idea: 6, town: 'Bhuj', area: 'Din Dayal Nagar, Bhuj', address: 'Hospital Road, Din Dayal Nagar, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Urdhvaga Consultancy', slug: 'urdhvaga-consultancy-bhuj', category: 'it-tech', idea: 7, town: 'Bhuj', area: 'Ashapura Ring Road, Bhuj', address: 'Katira Shopping Center, Ashapura Ring Road, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Vinay Manpower Consultant', slug: 'vinay-manpower-consultant-bhuj', category: 'it-tech', idea: 7, town: 'Bhuj', area: 'Mirjapar, Bhuj', address: 'Bhuj Sukhpar Highway, Mirjapar, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Arkay HR Consultancy', slug: 'arkay-hr-consultancy-bhuj', category: 'it-tech', idea: 7, town: 'Bhuj', area: 'Bhuj', address: 'Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'CodelyHut Infotech', slug: 'codelyhut-infotech-bhuj', category: 'it-tech', idea: 8, town: 'Bhuj', area: 'New Station Road, Bhuj', address: 'Parasmani Appartment, New Station Road, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'WRTeam', slug: 'wrteam-bhuj', category: 'it-tech', idea: 8, town: 'Bhuj', area: 'Mirjapar Highway, Bhuj', address: 'Time Square Empire, Mirjapar Highway, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Skyline Softech Solution', slug: 'skyline-softech-bhujpur', category: 'it-tech', idea: 8, town: 'Bhuj', area: 'Station Road, Bhujpur', address: 'Station Road, Bhujpur, Kutch, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Deep Koradia & Associates', slug: 'deep-koradia-associates-bhuj', category: 'cas', idea: 9, town: 'Bhuj', area: 'Bhanushali Nagar, Bhuj', address: 'Platinum One, Bhanushali Nagar, Bhuj, Kachchh', phone: '', email: '', ownerName: 'Deep Koradia' },
  { name: 'Pandit Vora & Associates', slug: 'pandit-vora-associates-bhuj', category: 'cas', idea: 9, town: 'Bhuj', area: 'Station Road, Bhuj', address: 'Krishna Chambers, Station Road, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'KMG CO LLP', slug: 'kmg-co-llp-bhuj', category: 'cas', idea: 9, town: 'Bhuj', area: 'Bhuj', address: 'Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Jitendra Thacker And Associates', slug: 'jitendra-thacker-associates-bhuj', category: 'cas', idea: 9, town: 'Bhuj', area: 'New Station Road, Bhuj', address: 'Happy Commercial Center, New Station Road, Bhuj, Kachchh', phone: '', email: '', ownerName: 'Jitendra Thacker' },
  { name: 'Bird Eye Production', slug: 'bird-eye-production-bhuj', category: 'events', idea: 10, town: 'Bhuj', area: 'Mirzapur Main Bazar, Bhuj', address: 'Main Bazar, Mirzapur, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Bhavin Patadiya Photography', slug: 'bhavin-patadiya-photography-bhuj', category: 'events', idea: 10, town: 'Bhuj', area: 'Lakhond, Bhuj', address: 'Main Bazar, Lakhond, Bhuj, Kachchh', phone: '', email: '', ownerName: 'Bhavin Patadiya' },
  { name: 'Sahara Photo & Video', slug: 'sahara-photo-video-bhuj', category: 'events', idea: 10, town: 'Bhuj', area: 'Sonivad, Bhuj', address: 'Flore Tariq Complex, Sonivad, Bhuj, Kachchh', phone: '', email: '', ownerName: '', estYear: '2002' },
  { name: 'Bhujodi Kala Cotton', slug: 'bhujodi-kala-cotton-bhujodi', category: 'general', idea: 11, town: 'Bhuj', area: 'Bhujodi, Kutch', address: 'Bhujodi, Kutch, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Apna Adda', slug: 'apna-adda-bhuj', category: 'general', idea: 11, town: 'Bhuj', area: 'Airport Road, Bhuj', address: 'The Katira Complex, Airport Road, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Diamond PG', slug: 'diamond-pg-bhuj', category: 'pg-hostel', idea: 12, town: 'Bhuj', area: 'Bhuj', address: 'Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Sweet Home Hostel', slug: 'sweet-home-hostel-bhuj', category: 'pg-hostel', idea: 12, town: 'Bhuj', area: 'Sahyognagar, Bhuj', address: 'Opposite Engineering College, Sahyognagar, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Bhimratna Samras Boys Hostel', slug: 'bhimratna-samras-hostel-bhuj', category: 'pg-hostel', idea: 12, town: 'Bhuj', area: 'Mirjapar, Bhuj', address: 'Sahjanand Nagar, Mirjapar, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Hari Om Electric & AC Service', slug: 'hari-om-electric-ac-bhuj', category: 'general', idea: 13, town: 'Bhuj', area: 'Mirzapar Road, Bhuj', address: 'Odhavkrupa Apartment, Mirzapar Road, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Mitesh House Maintenance', slug: 'mitesh-house-maintenance-bhuj', category: 'general', idea: 13, town: 'Bhuj', area: 'New Bhuj', address: 'New Bhuj, Kachchh', phone: '', email: '', ownerName: 'Mitesh' },
  { name: 'Mehran Plumbing Services', slug: 'mehran-plumbing-services-bhuj', category: 'general', idea: 13, town: 'Bhuj', area: 'Mankuwa, Bhuj', address: 'Near Patel Ice Candy, Bhuj Nakhatrana Road, Mankuwa, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Time Square Resort & Spa', slug: 'time-square-resort-bhuj', category: 'events', idea: 14, town: 'Bhuj', area: 'Bhuj-Mundra Road, Bhuj', address: 'Bhuj-Mundra Road, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Seven Sky Clarks Exotica', slug: 'seven-sky-clarks-exotica-bhuj', category: 'events', idea: 14, town: 'Bhuj', area: 'Airport Road, Bhuj', address: 'Airport Road, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'STAR Sound & DJ & Lights', slug: 'star-sound-dj-lights-bhuj', category: 'events', idea: 14, town: 'Bhuj', area: 'Kukma, Bhuj', address: 'Padheda Vistar, Kukma, Bhuj, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Veeha Boutique', slug: 'veeha-boutique-mandvi', category: 'salons', idea: 6, town: 'Mandvi', area: 'Babavadi Road, Mandvi', address: 'Babavadi Road, Mandvi, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Neelkanth Hardware Store', slug: 'neelkanth-hardware-nakhatrana', category: 'general', idea: 11, town: 'Nakhatrana', area: 'Super Market, Nakhatrana', address: 'Super Market, Nakhatrana, Kutch, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Mahalaxmi Hardware', slug: 'mahalaxmi-hardware-nakhatrana', category: 'general', idea: 11, town: 'Nakhatrana', area: 'Netra, Nakhatrana', address: 'Netra, Nakhatrana, Kutch, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Yasu The Family Salon', slug: 'yasu-family-salon-anjar', category: 'salons', idea: 6, town: 'Anjar', area: 'Chitrakut, Anjar', address: 'Near Reliance Trends Mall, Chitrakut, Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Keshav Hair Art', slug: 'keshav-hair-art-anjar', category: 'salons', idea: 6, town: 'Anjar', area: 'Vir Bhaghat Singh Nagar, Anjar', address: 'Shiv Shakti Society, Vir Bhaghat Singh Nagar, Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: "Odhni Rani's Boutique", slug: 'odhni-ranis-boutique-anjar', category: 'salons', idea: 6, town: 'Anjar', area: 'Meghpar, Anjar', address: 'Shop No 04, Shreeji Nagar, Meghpar, Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Dreamland Placement Service Pvt Ltd', slug: 'dreamland-placement-anjar', category: 'it-tech', idea: 7, town: 'Anjar', area: 'Anjar Highway, Anjar', address: 'Adarsh Building, Anjar Highway, Anjar, Kachchh', phone: '', email: '', ownerName: '', estYear: '2008' },
  { name: 'Rajhansh Enterprise', slug: 'rajhansh-enterprise-anjar', category: 'it-tech', idea: 7, town: 'Anjar', area: 'Meghpar, Anjar', address: 'Plot No 119, Survey No 8, Meghpar, Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Shreeji Tech Hub', slug: 'shreeji-tech-hub-anjar', category: 'it-tech', idea: 8, town: 'Anjar', area: 'Outside Ganga Naka, Anjar', address: 'Yamuna Complex, Outside Ganga Naka, Anjar, Kachchh', phone: '', email: '', ownerName: '', estYear: '2017' },
  { name: 'Sanju Software Developer', slug: 'sanju-software-developer-anjar', category: 'it-tech', idea: 8, town: 'Anjar', area: 'Maheshwari Vas, Anjar', address: 'Word No.5, Near Kumbhar Chowk, Maheshwari Vas, Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Paresh Hadiya & Associates', slug: 'paresh-hadiya-associates-anjar', category: 'cas', idea: 9, town: 'Anjar', area: 'Madhuban Mall, Anjar', address: 'Madhuban Mall, Opposite Swami Vivekanand Vidhyalay, Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Suresh H Thacker', slug: 'suresh-h-thacker-anjar', category: 'cas', idea: 9, town: 'Anjar', area: 'Savasar Naka, Anjar', address: '1st Floor, Swaminarayan Shopping Center, Savasar Naka, Shivaji Road, Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Jalaram Digital', slug: 'jalaram-digital-anjar', category: 'events', idea: 10, town: 'Anjar', area: 'Devaliya Naka, Anjar', address: 'Shop No 3, Opp Garden, Devaliya Naka, Anjar, Kachchh', phone: '', email: '', ownerName: 'Vishnukumar Dave', estYear: '2003' },
  { name: 'SNAP & SHOOT', slug: 'snap-and-shoot-anjar', category: 'events', idea: 10, town: 'Anjar', area: 'Khatri Chowk, Anjar', address: 'Meter Road, Khatri Chowk, Behind Shital Ice Cream, Anjar, Kachchh', phone: '', email: '', ownerName: 'Ashish M. Chauhan' },
  { name: 'Welcome Tea House', slug: 'welcome-tea-house-anjar', category: 'general', idea: 11, town: 'Anjar', area: 'Ganga Naka, Anjar', address: 'Opposite Bank Of Baroda Khatri Bazar, Ganga Naka, Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Om Print', slug: 'om-print-anjar', category: 'general', idea: 11, town: 'Anjar', area: 'Bus Station Road, Anjar', address: 'Bus Station Road, Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'R B Enterprise', slug: 'rb-enterprise-pg-anjar', category: 'pg-hostel', idea: 12, town: 'Anjar', area: 'RTO Service Road, Anjar', address: 'Ambika Society, RTO Service Road, Megparbori to Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Pravin Maheshwari', slug: 'pravin-maheshwari-plumber-anjar', category: 'general', idea: 13, town: 'Anjar', area: 'Vijay Nagar, Anjar', address: 'Plot No.22, Vijay Nagar, Beside Old Court, Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Uma Enterprise', slug: 'uma-enterprise-anjar', category: 'general', idea: 13, town: 'Anjar', area: 'Bhaghirath Nagar, Anjar', address: 'Uma Complex, Bhaghirath Nagar, Unnamed Road, Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Ditya Events', slug: 'ditya-events-anjar', category: 'events', idea: 14, town: 'Anjar', area: 'Ganga Naka, Anjar', address: 'Shop No.1, Maruti Complex, Lohana Mahajanwadi Road, Ganga Naka, Anjar, Kachchh', phone: '', email: '', ownerName: 'Thacker Jay Kishorbhai' },
  { name: 'Prajapati Chhatralaya', slug: 'prajapati-chhatralaya-anjar', category: 'events', idea: 14, town: 'Anjar', area: 'Vir Bhaghat Singh Nagar, Anjar', address: 'Gokul Nagar, Vir Bhaghat Singh Nagar, Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Accurate Search Consultants', slug: 'accurate-search-consultants-anjar', category: 'it-tech', idea: 15, town: 'Anjar', area: 'Chitrakoot Circle, Anjar', address: 'Near Chitrakoot Circle, Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Executive Ship Management Ltd', slug: 'executive-ship-management-anjar', category: 'it-tech', idea: 15, town: 'Anjar', area: 'Ward No 9-A, Anjar', address: 'Ward No 9-A, Second Floor, Anjar, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Kishan Hair Art', slug: 'kishan-hair-art-bhachau', category: 'salons', idea: 6, town: 'Bhachau', area: 'Chirai, Bhachau', address: 'Ramvadi Area, Chirai, Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Matrix Salon', slug: 'matrix-salon-bhachau', category: 'salons', idea: 6, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Lady Point', slug: 'lady-point-bhachau', category: 'salons', idea: 6, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'JP Kheradia Construction', slug: 'jp-kheradia-construction-bhachau', category: 'general', idea: 13, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Codteg', slug: 'codteg-bhachau', category: 'it-tech', idea: 8, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Siddharth Mehta CA', slug: 'siddharth-mehta-ca-bhachau', category: 'cas', idea: 9, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: 'Siddharth Mehta' },
  { name: 'Yogita S And Company', slug: 'yogita-s-and-company-bhachau', category: 'cas', idea: 9, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'RD Creation', slug: 'rd-creation-bhachau', category: 'events', idea: 10, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Odhani Studio', slug: 'odhani-studio-bhachau', category: 'events', idea: 10, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Vishnu Paints', slug: 'vishnu-paints-bhachau', category: 'general', idea: 11, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Prince Hardware', slug: 'prince-hardware-bhachau', category: 'general', idea: 11, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Honest Restaurant', slug: 'honest-restaurant-bhachau', category: 'general', idea: 11, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Adarsh Nivasi Sala', slug: 'adarsh-nivasi-sala-bhachau', category: 'pg-hostel', idea: 12, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Bholenath Enterprise', slug: 'bholenath-enterprise-bhachau', category: 'general', idea: 13, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Shree Vishwakarma Hardware', slug: 'shree-vishwakarma-hardware-bhachau', category: 'general', idea: 13, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Hotel Shiv International', slug: 'hotel-shiv-international-bhachau', category: 'events', idea: 14, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Samakhalyi Mahajan Wadi', slug: 'samakhalyi-mahajan-wadi-bhachau', category: 'events', idea: 14, town: 'Bhachau', area: 'Samakhiyali, Bhachau', address: 'Samakhiyali, Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
  { name: 'Shiv Shakti Construction', slug: 'shiv-shakti-construction-bhachau', category: 'general', idea: 13, town: 'Bhachau', area: 'Bhachau', address: 'Bhachau, Kachchh', phone: '', email: '', ownerName: '' },
];

const knownTowns = ['Gandhidham', 'Adipur', 'Shinay', 'Anjar', 'Bhachau', 'Bhuj', 'Mandvi', 'Nakhatrana'];

function inferTown(business) {
  const source = `${business.town || ''} ${business.area || ''} ${business.address || ''}`.toLowerCase();
  const town = knownTowns.find((candidate) => source.includes(candidate.toLowerCase()));
  return town || 'Kutch';
}

function normalizeBusiness(business) {
  return {
    ...business,
    town: business.town || inferTown(business),
  };
}

const businesses = rawBusinesses.map(normalizeBusiness);

const categoryMeta = {
  salons: { label: 'Salon & Boutique', tagline: 'Style, beauty & fashion in Kutch', icon: '💇', ideaLabel: 'Social Media Caption Generator', color: '#e91e8c' },
  'it-tech': { label: 'IT & Placement Services', tagline: 'Tech & talent solutions in Kutch', icon: '💻', ideaLabel: 'AI Resume / Cold Outreach / Job Board', color: '#1e88e5' },
  cas: { label: 'CA & Accountants', tagline: 'Trusted financial guidance in Kutch', icon: '📊', ideaLabel: 'Expense Tracker', color: '#ff9800' },
  events: { label: 'Photography & Events', tagline: 'Capturing moments across Kutch', icon: '📸', ideaLabel: 'Mini CRM / Portfolio / Ticketing', color: '#9c27b0' },
  'pg-hostel': { label: 'PG & Hostel', tagline: 'Comfortable stays in Kutch', icon: '🏠', ideaLabel: 'PG Listing Platform', color: '#009688' },
  general: { label: 'Local Business', tagline: 'Essential services in Kutch', icon: '🏪', ideaLabel: 'Business Directory / Review Tool', color: '#607d8b' },
};

const indexNameOverrides = {
  'anchor-rahul-budhani': 'Anchor Rahul Budhani (Event Hosting)',
  'tongue-twister-adipur': 'Tongue Twister - The Garden Restaurant',
  'ekankotri-shinay': 'Ekankotri (Software Co.)',
  'shree-ram-hardware-sinay': 'Shree Ram Hardware / Plumbers',
  'bdh-party-lawns-shinay': 'BDH Party Lawns (Ramada By Wyndham)',
  'ramada-wyndham-shinay': 'Ramada by Wyndham Gandhidham Shinay',
};

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeJs(value) {
  return JSON.stringify(String(value || ''));
}

function prettyCategory(category) {
  return categoryMeta[category] ? categoryMeta[category].label : category;
}

function getDirectoryDisplayName(business) {
  return indexNameOverrides[business.slug] || business.name;
}

function getAreaSummary(business) {
  return business.area.toLowerCase().includes(business.town.toLowerCase())
    ? business.area
    : `${business.area}, ${business.town}`;
}

function getIdeaLabel(idea) {
  return {
    6: 'Caption Generator',
    7: 'AI Resume Builder',
    8: 'Email Outreach',
    9: 'Expense Tracker',
    10: 'Mini CRM',
    11: 'Business Directory',
    12: 'PG Listing',
    13: 'Review Tool',
    14: 'Event Ticketing',
    15: 'Job Board',
  }[idea] || 'Business Tool';
}

function getFeaturePreview(business, meta) {
  switch (business.category) {
    case 'salons':
      return `
        <div class="preview-grid three-up">
          <article class="glass-card preview-card"><strong>Caption 01</strong><p>Fresh styles, festive glam, and walk-ins welcome at ${escapeHtml(business.name)} ✨</p></article>
          <article class="glass-card preview-card"><strong>Caption 02</strong><p>Your next self-care stop in ${escapeHtml(business.area)} — DM to book today 💄</p></article>
          <article class="glass-card preview-card"><strong>Caption 03</strong><p>Serving Kutch with beauty, confidence, and everyday elegance 💇</p></article>
        </div>`;
    case 'cas':
      return `
        <div class="preview-grid">
          <article class="glass-card preview-card finance-preview">
            <div class="donut" aria-hidden="true"></div>
            <div>
              <strong>Monthly Summary</strong>
              <p>Income tracked: ₹2.8L</p>
              <p>Expenses tracked: ₹1.1L</p>
              <p>Compliance reminders synced.</p>
            </div>
          </article>
        </div>`;
    case 'events':
      return `
        <div class="preview-grid three-up">
          <article class="glass-card preview-card"><strong>Wedding Portfolio</strong><p>450 guests • Sunset stage • Photo timeline synced.</p></article>
          <article class="glass-card preview-card"><strong>Corporate Event</strong><p>Lead status: Proposal sent • Follow-up due tomorrow.</p></article>
          <article class="glass-card preview-card"><strong>Birthday Showcase</strong><p>Gallery ready • 126 edited photos • Review request pending.</p></article>
        </div>`;
    case 'it-tech':
      return `
        <div class="preview-grid">
          <article class="glass-card preview-card email-draft">
            <strong>Cold Outreach Email Builder</strong>
            <p><span class="label">Subject</span><br>Helping ${escapeHtml(business.name)} get more inbound leads online</p>
            <p><span class="label">Draft</span><br>Hello, I noticed ${escapeHtml(business.name)} serves ${escapeHtml(business.area)} but doesn\'t yet have a conversion-focused site. We can set up a lead funnel, follow-up emails, and a demo landing page in days.</p>
          </article>
        </div>`;
    case 'pg-hostel':
      return `
        <div class="preview-grid two-up">
          <article class="glass-card preview-card"><strong>Single Room</strong><p>₹6,500 / month</p><p>Wi-Fi • Attached bath • Curfew support</p></article>
          <article class="glass-card preview-card"><strong>Shared Room</strong><p>₹4,200 / month</p><p>Meals • Laundry • Student-friendly location</p></article>
        </div>`;
    default:
      return `
        <div class="preview-grid three-up">
          <article class="glass-card preview-card"><strong>★★★★★</strong><p>Fast response and reliable service for our family.</p></article>
          <article class="glass-card preview-card"><strong>★★★★★</strong><p>Easy to find, trustworthy, and genuinely helpful.</p></article>
          <article class="glass-card preview-card"><strong>★★★★☆</strong><p>Would love online reviews and booking next time.</p></article>
        </div>`;
  }
}

function getOwnerHint(business) {
  if (business.ownerName) return `Owner: ${business.ownerName}`;
  return 'Independent local business lead';
}

function getPhoneDisplay(phone) {
  return phone ? `<a href="tel:${escapeHtml(phone)}" class="inline-link">${escapeHtml(phone)}</a>` : '—';
}

function getEmailDisplay(email) {
  return email ? `<a href="mailto:${escapeHtml(email)}" class="inline-link">${escapeHtml(email)}</a>` : '—';
}

function getMapUrl(address) {
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

function getInlineScript(business) {
  return `
(function () {
  var BUSINESS = {
    name: ${escapeJs(business.name)},
    phone: ${escapeJs(business.phone)},
    email: ${escapeJs(business.email)},
    address: ${escapeJs(business.address)}
  };
  var modal = document.getElementById('claimModal');
  var form = document.getElementById('claimForm');
  var copyButton = document.getElementById('copyAddress');
  var ownerInput = document.getElementById('ownerName');
  function toast(msg) {
    var t = document.getElementById("toast");
    t.textContent = String(msg || "");
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function() { t.classList.remove("show"); }, 2800);
  }
  function openClaim() {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    if (ownerInput) ownerInput.focus();
  }
  function closeClaim() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }
  document.querySelectorAll('[data-open-claim]').forEach(function (button) {
    button.addEventListener('click', openClaim);
  });
  document.querySelectorAll('[data-close-claim]').forEach(function (button) {
    button.addEventListener('click', closeClaim);
  });
  modal.addEventListener('click', function (event) {
    if (event.target === modal) closeClaim();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeClaim();
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    toast('✅ Claim request submitted! We\'ll contact you within 24hrs.');
    form.reset();
    document.getElementById('ownerPhone').value = BUSINESS.phone || '';
    document.getElementById('ownerEmail').value = BUSINESS.email || '';
    closeClaim();
  });
  copyButton.addEventListener('click', function () {
    var field = document.getElementById('addressText');
    var address = BUSINESS.address || '';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(function () {
        toast('📋 Address copied');
      }).catch(function () {
        field.focus();
        field.select();
        toast('📋 Copy the address manually');
      });
      return;
    }
    field.focus();
    field.select();
    toast('📋 Copy the address manually');
  });
})();`.trim();
}

function getSharedStyles(meta) {
  return `
:root {
  --brand-orange: #ff671f;
  --border: rgba(255,255,255,0.15);
  --accent: #00e676;
  --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --safe-bottom: env(safe-area-inset-bottom, 0px);
}
* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
html, body { margin: 0; padding: 0; background: #000; color: #fff; font-family: var(--font); }
a { color: inherit; }
body { min-height: 100vh; background: radial-gradient(circle at top, rgba(255,103,31,0.16), transparent 28%), #000; }
.demo-topbar {
  position: sticky; top: 0; z-index: 20; display: flex; justify-content: space-between; align-items: center; gap: 12px;
  padding: 14px 16px; backdrop-filter: blur(18px); background: rgba(10,10,10,0.86); border-bottom: 1px solid var(--border);
}
.topbar-title { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.topbar-name, .hero-title { font-weight: 900; text-transform: uppercase; letter-spacing: 0.04em; }
.topbar-name { font-size: 0.95rem; }
.page-shell { width: min(100%, 680px); margin: 0 auto; padding: 16px 16px calc(28px + var(--safe-bottom)); }
.hero, .result, .demo-note, .section-card, .footer-card, .map-card { margin-top: 18px; }
.hero-title { margin: 0 0 12px; font-size: clamp(2.4rem, 7vw, 3rem); line-height: 0.96; color: var(--brand-orange); }
.hero-copy { color: rgba(255,255,255,0.75); font-size: 1rem; margin-bottom: 16px; }
.hero-stack { display: flex; flex-wrap: wrap; gap: 10px; }
.glass-card, .result, .demo-note, .section-card, .footer-card, .map-card {
  background: linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03));
  border: 1px solid var(--border); border-radius: 22px; box-shadow: 0 24px 60px rgba(0,0,0,0.35); backdrop-filter: blur(18px);
}
.result, .section-card, .footer-card, .map-card { padding: 18px; }
.badge, .tag-live, .pill {
  display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; font-size: 0.78rem;
  font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
}
.badge { background: rgba(255,103,31,0.14); border: 1px solid rgba(255,103,31,0.45); color: #fff; }
.tag-live { background: rgba(0,230,118,0.12); border: 1px solid rgba(0,230,118,0.42); color: var(--accent); }
.pill { background: rgba(255,255,255,0.06); border: 1px solid var(--border); color: rgba(255,255,255,0.88); }
.label { font-size: 0.74rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.6); }
.result-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.info-cell { border-radius: 18px; padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); }
.info-cell strong { display: block; margin-bottom: 8px; }
.inline-link { color: #fff; text-decoration: underline; text-decoration-color: rgba(255,103,31,0.55); }
.dot-live { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); display: inline-block; box-shadow: 0 0 0 rgba(0,230,118,0.55); animation: pulse 1.8s infinite; margin-right: 8px; }
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(0,230,118,0.55); }
  70% { box-shadow: 0 0 0 14px rgba(0,230,118,0); }
  100% { box-shadow: 0 0 0 0 rgba(0,230,118,0); }
}
.demo-note { padding: 18px; border-radius: 20px; background: linear-gradient(180deg, rgba(255,103,31,0.12), rgba(255,103,31,0.05)); border: 1px solid rgba(255,103,31,0.4); }
.action, .secondary {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 18px; padding: 13px 16px;
  font-size: 0.88rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; cursor: pointer; border: 1px solid transparent;
}
.action:hover, .secondary:hover, .preview-card:hover, .result:hover, .map-card:hover, .section-card:hover, .footer-card:hover { transform: translateY(-2px); }
.action { background: var(--brand-orange); color: #000; box-shadow: 0 16px 36px rgba(255,103,31,0.25); }
.secondary { background: rgba(255,255,255,0.04); color: #fff; border-color: var(--border); }
.section-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 14px; }
.section-title { margin: 0; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.08em; }
.preview-wrap { position: relative; overflow: hidden; }
.preview-grid { display: grid; gap: 12px; }
.preview-grid.two-up { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.preview-grid.three-up { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.preview-card { min-height: 132px; padding: 14px; border-radius: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); }
.preview-card p { color: rgba(255,255,255,0.72); margin: 8px 0 0; }
.preview-lock {
  position: absolute; inset: auto 14px 14px; display: inline-flex; justify-content: center;
}
.preview-lock .secondary { background: rgba(0,0,0,0.74); backdrop-filter: blur(14px); }
.finance-preview { display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 16px; }
.donut {
  width: 92px; height: 92px; border-radius: 50%; background: conic-gradient(var(--brand-orange) 0 210deg, rgba(255,255,255,0.1) 210deg 360deg);
  position: relative;
}
.donut::after {
  content: ''; position: absolute; inset: 16px; border-radius: 50%; background: #000; border: 1px solid rgba(255,255,255,0.06);
}
.kbd {
  width: 100%; min-height: 88px; resize: none; padding: 14px; border-radius: 18px; border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04); color: #fff; font: inherit; margin-top: 12px;
}
.footer-card { color: rgba(255,255,255,0.7); font-size: 0.92rem; }
.footer-card a { color: #fff; }
.modal-overlay {
  position: fixed; inset: 0; display: none; align-items: center; justify-content: center; padding: 16px;
  background: rgba(0,0,0,0.7); backdrop-filter: blur(14px); z-index: 30;
}
.modal-overlay.show { display: flex; }
.modal-card {
  width: min(100%, 520px); border-radius: 22px; padding: 20px; background: #0b0b0b; border: 1px solid var(--border);
  box-shadow: 0 24px 60px rgba(0,0,0,0.45);
}
.field { margin-top: 12px; }
.field input, .field textarea {
  width: 100%; border-radius: 16px; padding: 14px; background: rgba(255,255,255,0.04); color: #fff; border: 1px solid var(--border); font: inherit;
}
.modal-actions { display: flex; gap: 10px; margin-top: 18px; flex-wrap: wrap; }
.toast {
  position: fixed; left: 50%; bottom: calc(18px + var(--safe-bottom)); transform: translateX(-50%) translateY(12px);
  background: rgba(18,18,18,0.92); color: #fff; border: 1px solid var(--border); border-radius: 999px; padding: 12px 16px;
  opacity: 0; pointer-events: none; transition: opacity 0.2s ease, transform 0.2s ease; z-index: 40;
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
@media (max-width: 640px) {
  .demo-topbar { align-items: flex-start; flex-direction: column; }
  .result-grid, .preview-grid.two-up, .preview-grid.three-up, .finance-preview { grid-template-columns: 1fr; }
}
`.trim();
}

function generateHTML(business) {
  const meta = categoryMeta[business.category];
  const title = `${business.name} — Kutch Digital Map`;
  const description = `${meta.tagline} | ${business.address} | ${business.town}`;
  const ownerHint = getOwnerHint(business);
  const featurePreview = getFeaturePreview(business, meta);
  const mapUrl = getMapUrl(business.address);
  const script = getInlineScript(business);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#ff671f" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <style>
${getSharedStyles(meta)}
  </style>
</head>
<body>
  <header class="demo-topbar">
    <div class="topbar-title">
      <span class="topbar-name">${escapeHtml(business.name)}</span>
      <span class="badge" aria-label="${escapeHtml(meta.label)} category">${escapeHtml(meta.label)}</span>
    </div>
    <button type="button" class="action" data-open-claim aria-label="Claim this listing">Claim This Listing</button>
  </header>

  <main class="page-shell">
    <section class="hero">
      <p class="label">${escapeHtml(meta.icon)} ${escapeHtml(meta.ideaLabel)}</p>
      <h1 class="hero-title">${escapeHtml(business.name)}</h1>
      <p class="hero-copy">${escapeHtml(meta.tagline)}</p>
      <div class="hero-stack">
        <span class="tag-live">Live Demo Preview</span>
        <span class="pill">${escapeHtml(business.town)}</span>
        <span class="pill">${escapeHtml(business.area)}</span>
      </div>
    </section>

    <section class="result" aria-labelledby="business-info-title">
      <div class="section-header">
        <h2 id="business-info-title" class="section-title">Business Info</h2>
        <span class="pill">Idea #${escapeHtml(business.idea)}</span>
      </div>
      <div class="result-grid">
        <article class="info-cell"><span class="label">📍 Address</span><strong>${escapeHtml(business.address)}</strong><span>${escapeHtml(`${business.area} · ${business.town}`)}</span></article>
        <article class="info-cell"><span class="label">📌 Town</span><strong>${escapeHtml(business.town)}</strong><span>Kutch coverage node</span></article>
        <article class="info-cell"><span class="label">📞 Phone</span><strong>${getPhoneDisplay(business.phone)}</strong><span>${escapeHtml(ownerHint)}</span></article>
        <article class="info-cell"><span class="label">✉️ Email</span><strong>${getEmailDisplay(business.email)}</strong><span>Direct owner contact</span></article>
        <article class="info-cell"><span class="label">🕐 Status</span><strong><span class="dot-live"></span>Open for Business</strong><span>Local listing ready for upgrade</span></article>
        <article class="info-cell"><span class="label">🏷️ Category</span><strong>${escapeHtml(meta.label)}</strong><span>${escapeHtml(meta.ideaLabel)}</span></article>
        <article class="info-cell"><span class="label">💡 Idea #</span><strong>${escapeHtml(business.idea)}</strong><span>${escapeHtml(meta.ideaLabel)}</span></article>
      </div>
    </section>

    <section class="demo-note" aria-labelledby="upgrade-title">
      <h2 id="upgrade-title" class="section-title">Digital Upgrade Opportunity</h2>
      <p>⚡ This business hasn\'t claimed their digital presence yet. Are you the owner? Claim this listing to get a real website, booking system, and customer reviews.</p>
      <div class="modal-actions">
        <button type="button" class="action" data-open-claim aria-label="Claim and upgrade ${escapeHtml(business.name)}">Claim &amp; Upgrade →</button>
      </div>
    </section>

    <section class="section-card preview-wrap" aria-labelledby="preview-title">
      <div class="section-header">
        <h2 id="preview-title" class="section-title">${escapeHtml(meta.ideaLabel)} Preview</h2>
        <span class="pill">Demo Locked</span>
      </div>
      ${featurePreview}
      <div class="preview-lock">
        <button type="button" class="secondary" data-open-claim aria-label="Unlock this tool for ${escapeHtml(business.name)}">🔒 Unlock This Tool — Claim Listing</button>
      </div>
    </section>

    <section class="map-card" aria-labelledby="location-title">
      <div class="section-header">
        <h2 id="location-title" class="section-title">Location</h2>
        <a class="secondary" href="${escapeHtml(mapUrl)}" target="_blank" rel="noreferrer" aria-label="View ${escapeHtml(business.name)} on Google Maps">📍 View on Map →</a>
      </div>
      <p>${escapeHtml(business.address)}</p>
      <textarea id="addressText" class="kbd" readonly aria-label="Business address">${escapeHtml(business.address)}</textarea>
      <div class="modal-actions">
        <button type="button" id="copyAddress" class="secondary" aria-label="Copy address for ${escapeHtml(business.name)}">Copy Address</button>
      </div>
    </section>

    <footer class="footer-card">
      <p><a href="../index.html">Powered by Kutch Digital Map</a></p>
      <p>Part of the Via-Decide Open Source Project</p>
      <p>${escapeHtml(meta.label)} · Idea #${escapeHtml(business.idea)}</p>
      <p>© 2025 Community Directory — Not affiliated with the business</p>
    </footer>
  </main>

  <div class="modal-overlay" id="claimModal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Claim ${escapeHtml(business.name)}">
    <div class="modal-card">
      <h2>Claim ${escapeHtml(business.name)}</h2>
      <p class="hero-copy">Tell us what you need and we\'ll help you launch your digital presence.</p>
      <form id="claimForm">
        <div class="field">
          <label class="label" for="ownerName">Owner name</label>
          <input id="ownerName" name="ownerName" type="text" required aria-label="Owner name" />
        </div>
        <div class="field">
          <label class="label" for="ownerPhone">Phone</label>
          <input id="ownerPhone" name="ownerPhone" type="tel" value="${escapeHtml(business.phone)}" aria-label="Phone" />
        </div>
        <div class="field">
          <label class="label" for="ownerEmail">Email</label>
          <input id="ownerEmail" name="ownerEmail" type="email" value="${escapeHtml(business.email)}" aria-label="Email" />
        </div>
        <div class="field">
          <label class="label" for="ownerNeeds">Tell us what you need</label>
          <textarea id="ownerNeeds" name="ownerNeeds" rows="4" placeholder="Website / Booking system / Reviews tool..." aria-label="Tell us what you need"></textarea>
        </div>
        <div class="modal-actions">
          <button type="submit" class="action" aria-label="Submit claim request">Submit Claim</button>
          <button type="button" class="secondary" data-close-claim aria-label="Cancel claim modal">Cancel</button>
        </div>
      </form>
    </div>
  </div>

  <div id="toast" class="toast" role="status" aria-live="polite"></div>

  <script>
${script}
  </script>
</body>
</html>`;
}

function generateMasterTemplate() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#ff671f" />
  <title>{{BUSINESS_NAME}} — Kutch Digital Map</title>
  <meta name="description" content="{{TAGLINE}} | {{ADDRESS}}" />
  <style>
${getSharedStyles(categoryMeta.general)}
  </style>
</head>
<body>
  <!-- 1. TOP BAR -->
  <header class="demo-topbar">
    <div class="topbar-title">
      <span class="topbar-name">{{BUSINESS_NAME}}</span>
      <span class="badge">{{CATEGORY_LABEL}}</span>
    </div>
    <button type="button" class="action" data-open-claim>Claim This Listing</button>
  </header>

  <main class="page-shell">
    <!-- 2. HERO SECTION -->
    <section class="hero">
      <p class="label">{{ICON}} {{IDEA_LABEL}}</p>
      <h1 class="hero-title">{{BUSINESS_NAME}}</h1>
      <p class="hero-copy">{{TAGLINE}}</p>
      <div class="hero-stack">
        <span class="tag-live">Live Demo Preview</span>
        <span class="pill">{{TOWN}}</span>
        <span class="pill">{{AREA}}</span>
      </div>
    </section>

    <!-- 3. BUSINESS INFO CARD (.result style) -->
    <section class="result">
      <div class="section-header">
        <h2 class="section-title">Business Info</h2>
        <span class="pill">Idea #{{IDEA_NUMBER}}</span>
      </div>
      <div class="result-grid">
        <article class="info-cell"><span class="label">📍 Address</span><strong>{{ADDRESS}}</strong><span>{{AREA}} · {{TOWN}}</span></article>
        <article class="info-cell"><span class="label">📌 Town</span><strong>{{TOWN}}</strong><span>Kutch coverage node</span></article>
        <article class="info-cell"><span class="label">📞 Phone</span><strong>{{PHONE}}</strong><span>{{OWNER_HINT}}</span></article>
        <article class="info-cell"><span class="label">✉️ Email</span><strong>{{EMAIL}}</strong><span>Direct owner contact</span></article>
        <article class="info-cell"><span class="label">🕐 Status</span><strong><span class="dot-live"></span>Open for Business</strong><span>Local listing ready for upgrade</span></article>
        <article class="info-cell"><span class="label">🏷️ Category</span><strong>{{CATEGORY_LABEL}}</strong><span>{{IDEA_LABEL}}</span></article>
        <article class="info-cell"><span class="label">💡 Idea #</span><strong>{{IDEA_NUMBER}}</strong><span>{{IDEA_LABEL}}</span></article>
      </div>
    </section>

    <!-- 4. DIGITAL UPGRADE BANNER -->
    <section class="demo-note">
      <h2 class="section-title">Digital Upgrade Opportunity</h2>
      <p>⚡ This business hasn't claimed their digital presence yet. Are you the owner? Claim this listing to get a real website, booking system, and customer reviews.</p>
      <div class="modal-actions"><button type="button" class="action" data-open-claim>Claim &amp; Upgrade →</button></div>
    </section>

    <!-- 5. CATEGORY-SPECIFIC FEATURE PREVIEW -->
    <section class="section-card preview-wrap">
      <div class="section-header">
        <h2 class="section-title">{{IDEA_LABEL}} Preview</h2>
        <span class="pill">Demo Locked</span>
      </div>
      {{FEATURE_PREVIEW_HTML}}
      <div class="preview-lock"><button type="button" class="secondary" data-open-claim>🔒 Unlock This Tool — Claim Listing</button></div>
    </section>

    <!-- 6. LOCATION SECTION -->
    <section class="map-card">
      <div class="section-header">
        <h2 class="section-title">Location</h2>
        <a class="secondary" href="{{MAP_URL}}" target="_blank" rel="noreferrer">📍 View on Map →</a>
      </div>
      <p>{{ADDRESS}}</p>
      <textarea id="addressText" class="kbd" readonly>{{ADDRESS}}</textarea>
      <div class="modal-actions"><button type="button" id="copyAddress" class="secondary">Copy Address</button></div>
    </section>

    <!-- 8. FOOTER -->
    <footer class="footer-card">
      <p><a href="../index.html">Powered by Kutch Digital Map</a></p>
      <p>Part of the Via-Decide Open Source Project</p>
      <p>{{CATEGORY_LABEL}} · Idea #{{IDEA_NUMBER}}</p>
      <p>© 2025 Community Directory — Not affiliated with the business</p>
    </footer>
  </main>

  <!-- 7. CLAIM LISTING MODAL -->
  <div class="modal-overlay" id="claimModal" aria-hidden="true">
    <div class="modal-card">
      <h2>Claim {{BUSINESS_NAME}}</h2>
      <form id="claimForm">
        <div class="field"><label class="label" for="ownerName">Owner name</label><input id="ownerName" type="text" /></div>
        <div class="field"><label class="label" for="ownerPhone">Phone</label><input id="ownerPhone" type="tel" value="{{PHONE_RAW}}" /></div>
        <div class="field"><label class="label" for="ownerEmail">Email</label><input id="ownerEmail" type="email" value="{{EMAIL_RAW}}" /></div>
        <div class="field"><label class="label" for="ownerNeeds">Tell us what you need</label><textarea id="ownerNeeds" rows="4" placeholder="Website / Booking system / Reviews tool..."></textarea></div>
        <div class="modal-actions">
          <button type="submit" class="action">Submit Claim</button>
          <button type="button" class="secondary" data-close-claim>Cancel</button>
        </div>
      </form>
    </div>
  </div>

  <div id="toast" class="toast" role="status" aria-live="polite"></div>

  <script>
// Replace placeholder values with business data in the generator output.
${getInlineScript({ name: '{{BUSINESS_NAME}}', phone: '{{PHONE_RAW}}', email: '{{EMAIL_RAW}}', address: '{{ADDRESS}}' })}
  </script>
</body>
</html>`;
}

function getIndexStyle(meta) {
  return {
    salons: { emoji: '✂️', bg: 'rgba(192,132,252,0.1)', color: '#c084fc', border: 'rgba(192,132,252,0.2)' },
    cas: { emoji: '📊', bg: 'rgba(74,222,128,0.1)', color: 'var(--green)', border: 'rgba(74,222,128,0.2)' },
    events: { emoji: '📸', bg: 'rgba(244,114,182,0.1)', color: '#f472b6', border: 'rgba(244,114,182,0.2)' },
    'it-tech': { emoji: '💻', bg: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: 'rgba(56,189,248,0.2)' },
    'pg-hostel': { emoji: '🏠', bg: 'rgba(232,80,58,0.1)', color: 'var(--accent2)', border: 'rgba(232,80,58,0.2)' },
    general: { emoji: '🛍️', bg: 'rgba(245,166,35,0.1)', color: 'var(--accent)', border: 'rgba(245,166,35,0.2)' },
  }[meta];
}

function getDirectoryContactAction(business, style) {
  if (business.phone) {
    return `<a href="tel:${escapeHtml(business.phone)}" class="dir-website-btn" style="border-color: ${style.color}; color: ${style.color};">Call</a>`;
  }
  if (business.email) {
    return `<a href="mailto:${escapeHtml(business.email)}" class="dir-website-btn" style="border-color: ${style.color}; color: ${style.color};">Email</a>`;
  }
  return '';
}

function getDirectoryContactMarkup(business) {
  if (business.phone) {
    return `<a href="tel:${escapeHtml(business.phone)}" class="inline-link">${escapeHtml(business.phone)}</a>`;
  }
  if (business.email) {
    return `<a href="mailto:${escapeHtml(business.email)}" class="inline-link">${escapeHtml(business.email)}</a>`;
  }
  return '<span style="color:#666">Contact via directory</span>';
}

function buildIndexCard(business) {
  const style = getIndexStyle(business.category);
  const categoryLabel = prettyCategory(business.category);
  const displayName = getDirectoryDisplayName(business);
  const contact = getDirectoryContactMarkup(business);
  const note = business.note || (business.ownerName ? `Owner: ${business.ownerName}.` : `${categoryLabel} lead in ${getAreaSummary(business)}.`);
  const mapUrl = getMapUrl(business.address);
  const contactAction = getDirectoryContactAction(business, style);
  const ideaLabel = getIdeaLabel(business.idea);

  return `  <div class="dir-card" data-category="${escapeHtml(business.category)}" data-name="${escapeHtml(displayName)}" data-town="${escapeHtml(business.town)}" data-type="${escapeHtml(categoryLabel)}" data-location="${escapeHtml(business.address)}">
    <div class="dir-card-top">
      <div class="dir-avatar" style="background:${style.bg};border:1px solid ${style.border};color:${style.color}">${style.emoji}</div>
      <div class="dir-card-meta">
        <span class="dir-tag saas-tag" style="background:${style.bg};color:${style.color}; border: 1px solid ${style.border};">#${escapeHtml(business.idea)} ${escapeHtml(ideaLabel)}</span>
        <span class="dir-tag town-tag" style="background:${style.bg};color:${style.color}; border: 1px solid ${style.border};">${escapeHtml(business.town)}</span>
        <button class="save-btn" type="button" data-business="${escapeHtml(displayName)}" aria-label="Save ${escapeHtml(displayName)}">☆</button>
      </div>
    </div>
    <h3 class="business-name dir-card-name">${escapeHtml(displayName)}</h3>
    <div class="dir-card-cat">${escapeHtml(`${categoryLabel} · ${business.town}`)}</div>
    <p class="business-location dir-card-loc"><span>📍</span> ${escapeHtml(business.address)}</p>
    <div class="dir-card-contact">${contact}</div>
    <div class="dir-card-note">${escapeHtml(note)}</div>
    <div class="dir-card-footer">
      <button type="button" class="dir-tag claim-btn" style="background:${style.bg};color:${style.color}; border: 1px solid ${style.border}; cursor: pointer; transition: 0.2s;">Claim Listing</button>
      <div class="dir-card-actions">
        ${contactAction}
        <a href="./sites/${escapeHtml(business.slug)}.html" class="dir-website-btn btn-visit">VIEW SITE →</a>
        <a href="${escapeHtml(mapUrl)}" target="_blank" rel="noreferrer" class="dir-website-btn">Directions ↗</a>
      </div>
    </div>
  </div>`;
}

function buildDirectoryGrid() {
  const cards = businesses.map((business) => buildIndexCard(business)).join('\n');
  return `<section class="directory" id="directoryGrid">\n${cards}\n  <div class="directory-empty" id="directoryEmpty" hidden>No businesses found matching your criteria.</div>\n</section>`;
}

function validateUniqueSlugs(items) {
  const seen = new Set();
  const duplicates = [];
  items.forEach((item) => {
    if (seen.has(item.slug)) duplicates.push(item.slug);
    seen.add(item.slug);
  });
  if (duplicates.length) {
    throw new Error(`Duplicate slugs detected: ${duplicates.join(', ')}`);
  }
}

function updateIndexHtml(indexHtml) {
  return indexHtml.replace(
    /<section class="directory" id="directoryGrid">[\s\S]*?<\/section>/,
    buildDirectoryGrid()
  );
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function writeOutputs() {
  const repoRoot = path.resolve(__dirname, '..');
  const sitesDir = path.join(repoRoot, 'sites');
  const templatesDir = path.join(repoRoot, 'templates');
  const indexPath = path.join(repoRoot, 'index.html');
  const businessesPath = path.join(repoRoot, 'businesses.json');

  validateUniqueSlugs(businesses);

  fs.mkdirSync(sitesDir, { recursive: true });
  fs.mkdirSync(templatesDir, { recursive: true });

  let generatedCount = 0;
  let skippedCount = 0;

  businesses.forEach((business) => {
    const html = generateHTML(business);
    const outputPath = path.join(sitesDir, `${business.slug}.html`);
    if (fs.existsSync(outputPath)) {
      skippedCount += 1;
      return;
    }
    fs.writeFileSync(outputPath, html);
    generatedCount += 1;
  });

  const sitemap = businesses.map((business) => ({
    slug: business.slug,
    name: business.name,
    idea: business.idea,
    town: business.town,
    category: business.category,
    area: business.area,
    address: business.address,
    phone: business.phone,
    email: business.email,
    ownerName: business.ownerName || '',
    url: `./sites/${business.slug}.html`,
  }));

  fs.writeFileSync(path.join(sitesDir, 'index.json'), `${JSON.stringify(sitemap, null, 2)}\n`);
  fs.writeFileSync(
    businessesPath,
    `${JSON.stringify(
      businesses.map((business) => ({
        name: business.name,
        slug: business.slug,
        town: business.town,
        category: business.category,
        idea: business.idea,
        area: business.area,
        address: business.address,
        phone: business.phone,
        email: business.email,
        ownerName: business.ownerName || '',
        note: business.note || '',
        url: `./sites/${business.slug}.html`,
      })),
      null,
      2
    )}\n`
  );
  fs.writeFileSync(path.join(templatesDir, 'business-site.html'), generateMasterTemplate());

  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  fs.writeFileSync(indexPath, updateIndexHtml(indexHtml));

  console.log(`✅ Generated ${generatedCount} new sites → /sites/`);
  console.log(`⏭  Skipped ${skippedCount} existing sites`);
  console.log(`📄 Updated sites/index.json — total: ${sitemap.length} entries`);
}

writeOutputs();
