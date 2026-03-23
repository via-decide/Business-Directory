#!/usr/bin/env node
/**
 * Kutch Digital Map — Site Generator
 * Single source of truth: 130 businesses across 8 towns in Kutch
 * Generates: sites/{slug}.html (130 microsites) + sites/index.json
 */

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════
// BUSINESS DATABASE — 130 entries
// ═══════════════════════════════════════

const businesses = [

  // ════════════════════════════════
  // GANDHIDHAM / ADIPUR / SHINAY
  // ════════════════════════════════

  { name:"Salon 2 The Family Salon & Tattoo Studio", slug:"salon-2-gandhidham", category:"salons", idea:6, town:"Gandhidham", area:"Sector 8, Gandhidham", address:"Shop No.19, Ground Floor, Golden Arcade, Oslo Road, Sector 8, Gandhidham - 370201", phone:"8460513709", email:"", ownerName:"" },
  { name:"De Mayra Collections", slug:"de-mayra-collections", category:"salons", idea:6, town:"Gandhidham", area:"Sector 10, Gandhidham", address:"Plot No 18, Unit 1 and 2, Ward 7B, Sector 10, Gandhidham - 370201", phone:"8401155916", email:"", ownerName:"" },
  { name:"Skywings Job Placement & Accounts Service", slug:"skywings-gandhidham", category:"it-tech", idea:7, town:"Gandhidham", area:"Sector 7, Gandhidham", address:"T-6, Plot No. 32, Sector-7, Gandhidham - 370201", phone:"", email:"support@skywingsadvisors.com", ownerName:"" },
  { name:"Dishaa Consultancy", slug:"dishaa-consultancy", category:"it-tech", idea:7, town:"Gandhidham", area:"Kutch Kala Road, Gandhidham", address:"Plot No.216, Ward 12/B, Kutch Kala Road, Gandhidham - 370201", phone:"", email:"", ownerName:"" },
  { name:"N R Infotech", slug:"nr-infotech-gandhidham", category:"it-tech", idea:8, town:"Gandhidham", area:"Gandhidham Sector 1", address:"Gandhidham Sector 1, Gandhidham - 370201", phone:"", email:"", ownerName:"" },
  { name:"Great Peripherals", slug:"great-peripherals-gandhidham", category:"it-tech", idea:8, town:"Gandhidham", area:"Gandhidham Sector 1", address:"Dbz S-106 Ground Floor, Gandhidham Sector 1, Gandhidham - 370201", phone:"", email:"", ownerName:"" },
  { name:"Nilesh Buch & Associates", slug:"nilesh-buch-associates", category:"cas", idea:9, town:"Gandhidham", area:"Oslo Road, Gandhidham", address:"SF-208, Golden Arcade, Plot 141-142, Sector-8, Oslo Road, Gandhidham - 370201", phone:"", email:"nileshbuch@yahoo.com.sg", ownerName:"Nilesh Y Buch" },
  { name:"R J Mehta & Co", slug:"rj-mehta-co", category:"cas", idea:9, town:"Gandhidham", area:"Kutch Kala Road, Gandhidham", address:"Ply Zone Bldg Plot 211, Kutch Kala Road, Gandhidham Sector 1 - 370201", phone:"", email:"", ownerName:"Rakesh R Mehta" },
  { name:"Shree Ganesh Photos", slug:"shree-ganesh-photos", category:"events", idea:10, town:"Gandhidham", area:"Bharat Nagar, Gandhidham", address:"Gurukrupa Society, Bharat Nagar, Gandhidham - 370201", phone:"8460382852", email:"", ownerName:"" },
  { name:"Drashya Glamour Studio & Four Seasons Events", slug:"drashya-glamour-studio", category:"events", idea:10, town:"Gandhidham", area:"Oslo Circle, Gandhidham", address:"Gaytri Mandir Road, Near Oslo Circle, Gandhidham Sector 1 - 370201", phone:"", email:"", ownerName:"" },
  { name:"Trylo Inner Luxury", slug:"trylo-inner-luxury", category:"general", idea:11, town:"Gandhidham", area:"Sector 1A, Gandhidham", address:"Plot No 11, Near Kutch Kala Road, Opp Gokul Sweet, Sector 1A, Gandhidham - 370201", phone:"", email:"", ownerName:"" },
  { name:"Chat Ka Chaska Restaurant", slug:"chat-ka-chaska", category:"general", idea:11, town:"Gandhidham", area:"Shivaji Park, Gandhidham", address:"Opposite Shivaji Park, Gandhidham", phone:"", email:"", ownerName:"" },
  { name:"Aaradhana Hospitality Services", slug:"aaradhana-hospitality", category:"pg-hostel", idea:12, town:"Adipur", area:"GIDC Road, Adipur", address:"Boys Hostel Tolani College, GIDC Road Adipur, Gandhidham - 370205", phone:"", email:"", ownerName:"" },
  { name:"Suvidha PG & Accommodation", slug:"suvidha-pg", category:"pg-hostel", idea:12, town:"Gandhidham", area:"Gandhidham HO", address:"Corporate Park, Opp. Arjan's Mall, Gandhidham HO - 370201", phone:"", email:"", ownerName:"" },
  { name:"Vinod Electrical Solutions", slug:"vinod-electrical-solutions", category:"general", idea:13, town:"Adipur", area:"Adipur", address:"House No.15, Plot No.161/162, Reliance Society, Near Balaji Super Market, Adipur - 370205", phone:"9725367411", email:"", ownerName:"" },
  { name:"Patel Plumber Works", slug:"patel-plumber-works", category:"general", idea:13, town:"Gandhidham", area:"Oslo Road, Gandhidham", address:"Bhim Market, Oslo Road, Opp Golden Arcade, Gandhidham Sector 1 - 370201", phone:"", email:"", ownerName:"" },
  { name:"The Shiv Regency", slug:"shiv-regency-gandhidham", category:"events", idea:14, town:"Gandhidham", area:"Ward 12/B, Gandhidham", address:"360, Ward 12/B, Gandhidham - 370201", phone:"", email:"theshivregency@shivhotels.com", ownerName:"" },
  { name:"Anchor Rahul Budhani", slug:"anchor-rahul-budhani", category:"events", idea:14, town:"Gandhidham", area:"Station Road, Gandhidham", address:"B-306, Raj Plaza, Station Road, Mahatma Gandhi Road, Gandhidham - 370201", phone:"", email:"", ownerName:"" },
  { name:"Maniifest HR Consultancy Pvt Ltd", slug:"maniifest-hr-consultancy", category:"it-tech", idea:15, town:"Gandhidham", area:"Sathwara Colony, Gandhidham", address:"Plot No 479, Sector No 5, Sathwara Colony, Gandhidham - 370201", phone:"", email:"maniifestempoweringsolutions@gmail.com", ownerName:"Amit Mukeshbhai Danani" },
  { name:"Bharat HR Solutions & Consultancy", slug:"bharat-hr-solutions", category:"it-tech", idea:15, town:"Gandhidham", area:"Kanchan Complex, Gandhidham", address:"Office No.02, First Floor, Kanchan Complex Kutchkala, Gandhidham - 370201", phone:"", email:"", ownerName:"Vadecha Bharat" },

  // ADIPUR
  { name:"Pink Daisy Boutique", slug:"pink-daisy-adipur", category:"salons", idea:6, town:"Adipur", area:"Adipur", address:"Opposite Prabhudharshan Hall, Adipur", phone:"8156081561", email:"", ownerName:"Ashokbhai Motiyani" },
  { name:"The Metro Hair & Beauty", slug:"metro-hair-beauty-adipur", category:"salons", idea:6, town:"Adipur", area:"Ward 4/B, Adipur", address:"Shop No 3, Plot No 310, Ward 4/B, Adipur", phone:"7984669391", email:"", ownerName:"" },
  { name:"Wellisa Salon & Nails", slug:"wellisa-salon-adipur", category:"salons", idea:6, town:"Adipur", area:"Rotry Circle, Adipur", address:"Friends Square, Ground Floor, Near Rotry Circle, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Acme Computing Services", slug:"acme-computing-adipur", category:"it-tech", idea:8, town:"Adipur", area:"Jalaram Mandir Road, Adipur", address:"Jalaram Mandir Road, Adipur", phone:"", email:"", ownerName:"Nitesh Punjani" },
  { name:"M K Soft Service", slug:"mk-soft-service-adipur", category:"it-tech", idea:8, town:"Adipur", area:"DC 5, Adipur", address:"Shivani B Building, DC 5, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Shadofax Technologies Pvt Ltd", slug:"shadofax-technologies", category:"it-tech", idea:8, town:"Adipur", area:"Rambhagh Road, Adipur", address:"Plot No.319 4b, Rambhagh Road, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Kpt & Co", slug:"kpt-co-adipur", category:"cas", idea:9, town:"Adipur", area:"Ward 3b, Adipur", address:"256, Om Mandir, Ward 3b, Adipur", phone:"", email:"", ownerName:"" },
  { name:"JB Photo Studio", slug:"jb-photo-studio-adipur", category:"events", idea:10, town:"Adipur", area:"Golden City, Adipur", address:"Gold Star Complex, Golden City, Ward 1a, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Chheda Decorators", slug:"chheda-decorators-adipur", category:"events", idea:10, town:"Adipur", area:"Behind DPS School, Adipur", address:"Malyalmanorama Nagar, Behind DPS School, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Tongue Twister The Garden Restaurant", slug:"tongue-twister-adipur", category:"general", idea:11, town:"Adipur", area:"Ward 6, Adipur", address:"Ward 6, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Vidhu's Treat", slug:"vidhus-treat-adipur", category:"general", idea:11, town:"Adipur", area:"Ward 5B, Adipur", address:"Plot No.3, Ward 5B, Opp S P Office DC 5, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Matka House Restaurant", slug:"matka-house-adipur", category:"general", idea:11, town:"Adipur", area:"Rambaug Road, Adipur", address:"Plot 25, Ward 6C, Rambaug Road, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Pragati Girls PG", slug:"pragati-girls-pg", category:"pg-hostel", idea:12, town:"Adipur", area:"Maitri School, Adipur", address:"108, Ashram Road, Near Maitri School, Ward 2A, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Yuva Sharthi PG", slug:"yuva-sharthi-pg", category:"pg-hostel", idea:12, town:"Adipur", area:"Goldencity, Adipur", address:"Sidhheswar Residency, Goldencity, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Deepak Plumber", slug:"deepak-plumber-adipur", category:"general", idea:13, town:"Adipur", area:"Adipur", address:"Adipur Hanuman Road, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Uma Enterprise Adipur", slug:"uma-enterprise-adipur", category:"general", idea:13, town:"Adipur", area:"Bhagirath Nagar, Adipur", address:"Plot No.474, Bhagirath Nagar, Adipur", phone:"", email:"", ownerName:"" },
  { name:"DPT Exhibition Ground", slug:"dpt-exhibition-adipur", category:"events", idea:14, town:"Adipur", area:"Adipur", address:"DPT Exhibition Ground, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Khavda Events", slug:"khavda-events-adipur", category:"events", idea:14, town:"Adipur", area:"Meghpar, Adipur", address:"Plot No.500, Meghpar, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Cheesy Events", slug:"cheesy-events-adipur", category:"events", idea:14, town:"Adipur", area:"Near Iscon Mandir, Adipur", address:"Mangleshwar Nagar, Near Iscon Mandir, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Etrnity Solutions", slug:"etrnity-solutions-adipur", category:"it-tech", idea:15, town:"Adipur", area:"Meghpar-Kumbharani, Adipur", address:"29, Sidheshwar Park, Meghpar-Kumbharani, Adipur", phone:"", email:"", ownerName:"" },
  { name:"Rightfithr Solutions", slug:"rightfithr-solutions-adipur", category:"it-tech", idea:15, town:"Adipur", area:"Rambag Road, Adipur", address:"4B, Rambag Road, Adipur", phone:"", email:"", ownerName:"" },

  // SHINAY
  { name:"Sumit Collection", slug:"sumit-collection-shinay", category:"salons", idea:6, town:"Shinay", area:"Mithila 2, Shinay", address:"Near Sarda Vidya Mandir Primary School, Mithila 2, Shinay", phone:"", email:"", ownerName:"" },
  { name:"Visanjhi Enterprise", slug:"visanjhi-enterprise-shinay", category:"it-tech", idea:15, town:"Shinay", area:"Shinay Road, Kachchh", address:"227 New Society, 1 Shinay Road, Shinay Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Ekankotri", slug:"ekankotri-shinay", category:"it-tech", idea:8, town:"Shinay", area:"Ward 1, Shinay", address:"Ward Number 1, Shop No 1, Shinay", phone:"", email:"", ownerName:"" },
  { name:"Shiv Sanket Blooming Lifestyle", slug:"shiv-sanket-shinay", category:"general", idea:11, town:"Shinay", area:"Shinay", address:"Shinay, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Shiv Fabrication", slug:"shiv-fabrication-shinay", category:"general", idea:11, town:"Shinay", area:"Antarjaal, Shinay", address:"Shop No 11, Shinay, Antarjaal", phone:"", email:"", ownerName:"" },
  { name:"Madhav Hardware", slug:"madhav-hardware-shinay", category:"general", idea:11, town:"Shinay", area:"Antarjal Shinay Road", address:"Sudamapuri Plot No 26, Antarjal Shinay Road", phone:"", email:"", ownerName:"" },
  { name:"Shree Ram Hardware Plumbers", slug:"shree-ram-hardware-sinay", category:"general", idea:13, town:"Shinay", area:"Adipur Sinay Road", address:"Gurukrupa Complex, Adipur Sinay Road", phone:"", email:"", ownerName:"" },
  { name:"Navkar Events", slug:"navkar-events-shinay", category:"events", idea:14, town:"Shinay", area:"Ward 3/B, Shinay", address:"Ward 3/B, Plot No 100, Shinay", phone:"", email:"", ownerName:"" },
  { name:"BDH Party Lawns Ramada", slug:"bdh-party-lawns-shinay", category:"events", idea:14, town:"Shinay", area:"Adipur Mundra Highway, Shinay", address:"Adipur Mundra Highway, Shinay", phone:"", email:"", ownerName:"" },
  { name:"Ramada by Wyndham Gandhidham", slug:"ramada-wyndham-shinay", category:"events", idea:14, town:"Shinay", area:"Adipur Mundra Highway, Shinay", address:"Adipur Mundra Highway, Shinay - 370205", phone:"", email:"", ownerName:"" },

  // ════════════════════════════════
  // ANJAR
  // ════════════════════════════════

  { name:"Yasu The Family Salon", slug:"yasu-family-salon-anjar", category:"salons", idea:6, town:"Anjar", area:"Chitrakut, Anjar", address:"Near Reliance Trends Mall, Chitrakut, Anjar, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Keshav Hair Art", slug:"keshav-hair-art-anjar", category:"salons", idea:6, town:"Anjar", area:"Vir Bhaghat Singh Nagar, Anjar", address:"Shiv Shakti Society, Vir Bhaghat Singh Nagar, Anjar, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Odhni Rani's Boutique", slug:"odhni-ranis-boutique-anjar", category:"salons", idea:6, town:"Anjar", area:"Meghpar, Anjar", address:"Shop No 04, Shreeji Nagar, Meghpar, Anjar, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Dreamland Placement Service Pvt Ltd", slug:"dreamland-placement-anjar", category:"it-tech", idea:7, town:"Anjar", area:"Anjar Highway, Anjar", address:"Adarsh Building, Anjar Highway, Anjar, Kachchh", phone:"", email:"", ownerName:"", estYear:"2008" },
  { name:"Rajhansh Enterprise", slug:"rajhansh-enterprise-anjar", category:"it-tech", idea:7, town:"Anjar", area:"Meghpar, Anjar", address:"Plot No 119, Survey No 8, Meghpar, Anjar, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Shreeji Tech Hub", slug:"shreeji-tech-hub-anjar", category:"it-tech", idea:8, town:"Anjar", area:"Ganga Naka, Anjar", address:"Yamuna Complex, Outside Ganga Naka, Anjar, Kachchh", phone:"", email:"", ownerName:"", estYear:"2017" },
  { name:"Sanju Software Developer", slug:"sanju-software-developer-anjar", category:"it-tech", idea:8, town:"Anjar", area:"Kumbhar Chowk, Anjar", address:"Maheshwari Vas, Ward No.5, Near Kumbhar Chowk, Anjar, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Paresh Hadiya & Associates", slug:"paresh-hadiya-associates-anjar", category:"cas", idea:9, town:"Anjar", area:"Anjar", address:"Madhuban Mall, Opposite Swami Vivekanand Vidhyalay, Anjar, Kachchh", phone:"", email:"", ownerName:"Paresh Hadiya" },
  { name:"Suresh H Thacker", slug:"suresh-h-thacker-anjar", category:"cas", idea:9, town:"Anjar", area:"Shivaji Road, Anjar", address:"1st Floor, Swaminarayan Shopping Center, Savasar Naka, Shivaji Road, Anjar, Kachchh", phone:"", email:"", ownerName:"Suresh H Thacker" },
  { name:"Jalaram Digital", slug:"jalaram-digital-anjar", category:"events", idea:10, town:"Anjar", area:"Devaliya Naka, Anjar", address:"Shop No 3, Opp Garden, Devaliya Naka, Anjar, Kachchh", phone:"", email:"", ownerName:"Vishnukumar Dave", estYear:"2003" },
  { name:"SNAP & SHOOT", slug:"snap-and-shoot-anjar", category:"events", idea:10, town:"Anjar", area:"Khatri Chowk, Anjar", address:"Meter Road, Khatri Chowk, Behind Shital Ice Cream, Anjar, Kachchh", phone:"", email:"", ownerName:"Ashish M. Chauhan" },
  { name:"Welcome Tea House", slug:"welcome-tea-house-anjar", category:"general", idea:11, town:"Anjar", area:"Ganga Naka, Anjar", address:"Ganga Naka, Opposite Bank Of Baroda Khatri Bazar, Anjar, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Om Print", slug:"om-print-anjar", category:"general", idea:11, town:"Anjar", area:"Bus Station Road, Anjar", address:"Bus Station Road, Anjar, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"R B Enterprise PG", slug:"rb-enterprise-pg-anjar", category:"pg-hostel", idea:12, town:"Anjar", area:"RTO Service Road, Anjar", address:"Ambika Society, RTO Service Road, Megparbori to Anjar, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Pravin Maheshwari Plumber", slug:"pravin-maheshwari-plumber-anjar", category:"general", idea:13, town:"Anjar", area:"Vijay Nagar, Anjar", address:"Plot No.22, Vijay Nagar, Beside Old Court, Anjar, Kachchh", phone:"", email:"", ownerName:"Pravin Maheshwari" },
  { name:"Uma Enterprise Anjar", slug:"uma-enterprise-anjar", category:"general", idea:13, town:"Anjar", area:"Bhaghirath Nagar, Anjar", address:"Uma Complex, Bhaghirath Nagar, Anjar, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Ditya Events", slug:"ditya-events-anjar", category:"events", idea:14, town:"Anjar", area:"Ganga Naka, Anjar", address:"Shop No.1, Maruti Complex, Lohana Mahajanwadi Road, Ganga Naka, Anjar, Kachchh", phone:"", email:"", ownerName:"Thacker Jay Kishorbhai" },
  { name:"Prajapati Chhatralaya", slug:"prajapati-chhatralaya-anjar", category:"events", idea:14, town:"Anjar", area:"Vir Bhaghat Singh Nagar, Anjar", address:"Gokul Nagar, Vir Bhaghat Singh Nagar, Anjar, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Accurate Search Consultants", slug:"accurate-search-consultants-anjar", category:"it-tech", idea:15, town:"Anjar", area:"Chitrakoot Circle, Anjar", address:"Near Chitrakoot Circle, Anjar, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Executive Ship Management Ltd", slug:"executive-ship-management-anjar", category:"it-tech", idea:15, town:"Anjar", area:"Ward No 9-A, Anjar", address:"Ward No 9-A, Second Floor, Anjar, Kachchh", phone:"", email:"", ownerName:"" },

  // ════════════════════════════════
  // BHACHAU
  // ════════════════════════════════

  { name:"Kishan Hair Art", slug:"kishan-hair-art-bhachau", category:"salons", idea:6, town:"Bhachau", area:"Chirai, Bhachau", address:"Nagarpalika Shopping Centre 1, Ramvada Area, Chirai, Bhachau, Kachchh", phone:"", email:"", ownerName:"", estYear:"2004" },
  { name:"Matrix Salon Bhachau", slug:"matrix-salon-bhachau", category:"salons", idea:6, town:"Bhachau", area:"Sadar Bajar, Bhachau", address:"Shop No 111, Sadar Bajar, Indraprasth, Bhachau, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Lady Point Bhachau", slug:"lady-point-bhachau", category:"salons", idea:6, town:"Bhachau", area:"Chirai, Bhachau", address:"Opposite Mahadev Medical Store, Chirai, Bhachau, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"J P Kheradia Construction Pvt Ltd", slug:"jp-kheradia-construction-bhachau", category:"it-tech", idea:7, town:"Bhachau", area:"Laxmiwadi, Bhachau", address:"Shri Harikrishna Niwas, 13, Laxmiwadi, Lakadia, Bhachau, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"CodTeg", slug:"codteg-bhachau", category:"it-tech", idea:8, town:"Bhachau", area:"Bhachau", address:"Bhachau, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Siddharth Mehta Chartered Accountant", slug:"siddharth-mehta-ca-bhachau", category:"cas", idea:9, town:"Bhachau", area:"Nagar Palika, Bhachau", address:"1, New Siddhachal Bldg, Opposite Nagar Palika, Bhachau, Kachchh", phone:"", email:"", ownerName:"Siddharth Mehta" },
  { name:"Yogita S And Company", slug:"yogita-s-and-company-bhachau", category:"cas", idea:9, town:"Bhachau", area:"Bhachau", address:"Bhachau, Kachchh", phone:"", email:"", ownerName:"", estYear:"2020" },
  { name:"Rd Creation", slug:"rd-creation-bhachau", category:"events", idea:10, town:"Bhachau", area:"Ghanshyamnagar, Bhachau", address:"Ghanshyamnagar, Bhachau, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Odhani Studio", slug:"odhani-studio-bhachau", category:"events", idea:10, town:"Bhachau", area:"Kabirnagar, Bhachau", address:"Kabirnagar, Chobari, Bhachau, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Vishnu Paints", slug:"vishnu-paints-bhachau", category:"general", idea:11, town:"Bhachau", area:"ST Road, Bhachau", address:"Shop No. 20, Arihant Complex, ST Road, Near Bus Stand, Bhachau, Kachchh", phone:"", email:"", ownerName:"Amit V Joshi" },
  { name:"Prince Hardware Bhachau", slug:"prince-hardware-bhachau", category:"general", idea:11, town:"Bhachau", area:"Dudhai Road, Bhachau", address:"Near Hotel Shiv, Dudhai Road, Ramwadi, Bhachau, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Honest Restaurant Sunrise Mall", slug:"honest-restaurant-bhachau", category:"general", idea:11, town:"Bhachau", area:"Dudhai Road, Bhachau", address:"Sunrise Mall, Dudhai Road, Chirai, Bhachau, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Adarsh Nivasi Sala", slug:"adarsh-nivasi-sala-bhachau", category:"pg-hostel", idea:12, town:"Bhachau", area:"Kabrau, Bhachau", address:"Kabrau, Bhachau, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Bholenath Enterprise", slug:"bholenath-enterprise-bhachau", category:"general", idea:13, town:"Bhachau", area:"Adhoi, Bhachau", address:"Main Bazar Tin Rasta, Adhoi, Bhachau, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Shree Vishwakarma Hardware & Alluminium", slug:"shree-vishwakarma-hardware-bhachau", category:"general", idea:13, town:"Bhachau", area:"Kharoi, Bhachau", address:"Kharoi, Bhachau, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Hotel Shiv International", slug:"hotel-shiv-international-bhachau", category:"events", idea:14, town:"Bhachau", area:"Dudhai Road, Bhachau", address:"Sunrise Mall, Near New Bus Station, Dudhai Road, Bhachau, Kachchh", phone:"", email:"info@hotelshiv.com", ownerName:"" },
  { name:"Samakhalyi Mahajan Wadi", slug:"samakhalyi-mahajan-wadi-bhachau", category:"events", idea:14, town:"Bhachau", area:"Samkhiyali, Bhachau", address:"Old Bus Station Road, Samkhiyali, Bhachau, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Shiv Shakti Construction Manpower", slug:"shiv-shakti-construction-bhachau", category:"it-tech", idea:15, town:"Bhachau", area:"Bhachau", address:"Bhachau, Kachchh", phone:"", email:"", ownerName:"Ashokkumar Solanki" },

  // ════════════════════════════════
  // BHUJ
  // ════════════════════════════════

  { name:"The Fab Tales", slug:"the-fab-tales-bhuj", category:"salons", idea:6, town:"Bhuj", area:"Sanskar Nagar, Bhuj", address:"Mangalam Ground Floor, Sanskar Nagar, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"White Hair Care", slug:"white-hair-care-bhuj", category:"salons", idea:6, town:"Bhuj", area:"Ghanshyam Nagar, Bhuj", address:"Near Anand Hotel, Ghanshyam Nagar, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Gems Hairs Studio", slug:"gems-hairs-studio-bhuj", category:"salons", idea:6, town:"Bhuj", area:"Din Dayal Nagar, Bhuj", address:"Hospital Road, Din Dayal Nagar, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Urdhvaga Consultancy", slug:"urdhvaga-consultancy-bhuj", category:"it-tech", idea:7, town:"Bhuj", area:"Ashapura Ring Road, Bhuj", address:"Katira Shopping Center, Ashapura Ring Road, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Vinay Manpower Consultant", slug:"vinay-manpower-consultant-bhuj", category:"it-tech", idea:7, town:"Bhuj", area:"Mirjapar, Bhuj", address:"Bhuj Sukhpar Highway, Mirjapar, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Arkay HR Consultancy", slug:"arkay-hr-consultancy-bhuj", category:"it-tech", idea:7, town:"Bhuj", area:"Bhuj", address:"Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"CodelyHut Infotech", slug:"codelyhut-infotech-bhuj", category:"it-tech", idea:8, town:"Bhuj", area:"New Station Road, Bhuj", address:"Parasmani Appartment, New Station Road, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"WRTeam", slug:"wrteam-bhuj", category:"it-tech", idea:8, town:"Bhuj", area:"Mirjapar Highway, Bhuj", address:"Time Square Empire, Mirjapar Highway, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Skyline Softech Solution", slug:"skyline-softech-bhujpur", category:"it-tech", idea:8, town:"Bhuj", area:"Station Road, Bhujpur", address:"Station Road, Bhujpur, Kutch, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Deep Koradia & Associates", slug:"deep-koradia-associates-bhuj", category:"cas", idea:9, town:"Bhuj", area:"Bhanushali Nagar, Bhuj", address:"Platinum One, Bhanushali Nagar, Bhuj, Kachchh", phone:"", email:"", ownerName:"Deep Koradia" },
  { name:"Pandit Vora & Associates", slug:"pandit-vora-associates-bhuj", category:"cas", idea:9, town:"Bhuj", area:"Station Road, Bhuj", address:"Krishna Chambers, Station Road, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"KMG CO LLP", slug:"kmg-co-llp-bhuj", category:"cas", idea:9, town:"Bhuj", area:"Bhuj", address:"Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Jitendra Thacker And Associates", slug:"jitendra-thacker-associates-bhuj", category:"cas", idea:9, town:"Bhuj", area:"New Station Road, Bhuj", address:"Happy Commercial Center, New Station Road, Bhuj, Kachchh", phone:"", email:"", ownerName:"Jitendra Thacker" },
  { name:"Bird Eye Production", slug:"bird-eye-production-bhuj", category:"events", idea:10, town:"Bhuj", area:"Mirzapur, Bhuj", address:"Main Bazar, Mirzapur, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Bhavin Patadiya Photography", slug:"bhavin-patadiya-photography-bhuj", category:"events", idea:10, town:"Bhuj", area:"Lakhond, Bhuj", address:"Main Bazar, Lakhond, Bhuj, Kachchh", phone:"", email:"", ownerName:"Bhavin Patadiya" },
  { name:"Sahara Photo & Video", slug:"sahara-photo-video-bhuj", category:"events", idea:10, town:"Bhuj", area:"Sonivad, Bhuj", address:"Flore Tariq Complex, Sonivad, Bhuj, Kachchh", phone:"", email:"", ownerName:"", estYear:"2002" },
  { name:"Bhujodi Kala Cotton", slug:"bhujodi-kala-cotton-bhujodi", category:"general", idea:11, town:"Bhuj", area:"Bhujodi, Kutch", address:"Bhujodi, Kutch, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Apna Adda", slug:"apna-adda-bhuj", category:"general", idea:11, town:"Bhuj", area:"Airport Road, Bhuj", address:"The Katira Complex, Airport Road, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Diamond PG", slug:"diamond-pg-bhuj", category:"pg-hostel", idea:12, town:"Bhuj", area:"Bhuj", address:"Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Sweet Home Hostel", slug:"sweet-home-hostel-bhuj", category:"pg-hostel", idea:12, town:"Bhuj", area:"Sahyognagar, Bhuj", address:"Opposite Engineering College, Sahyognagar, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Bhimratna Samras Boys Hostel", slug:"bhimratna-samras-hostel-bhuj", category:"pg-hostel", idea:12, town:"Bhuj", area:"Mirjapar, Bhuj", address:"Sahjanand Nagar, Mirjapar, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Hari Om Electric & AC Service", slug:"hari-om-electric-ac-bhuj", category:"general", idea:13, town:"Bhuj", area:"Mirzapar Road, Bhuj", address:"Odhavkrupa Apartment, Mirzapar Road, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Mitesh House Maintenance", slug:"mitesh-house-maintenance-bhuj", category:"general", idea:13, town:"Bhuj", area:"New Bhuj", address:"New Bhuj, Kachchh", phone:"", email:"", ownerName:"Mitesh" },
  { name:"Mehran Plumbing Services", slug:"mehran-plumbing-services-bhuj", category:"general", idea:13, town:"Bhuj", area:"Mankuwa, Bhuj", address:"Near Patel Ice Candy, Bhuj Nakhatrana Road, Mankuwa, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Time Square Resort & Spa", slug:"time-square-resort-bhuj", category:"events", idea:14, town:"Bhuj", area:"Bhuj-Mundra Road", address:"Bhuj-Mundra Road, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Seven Sky Clarks Exotica", slug:"seven-sky-clarks-exotica-bhuj", category:"events", idea:14, town:"Bhuj", area:"Airport Road, Bhuj", address:"Airport Road, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"STAR Sound & DJ & Lights", slug:"star-sound-dj-lights-bhuj", category:"events", idea:14, town:"Bhuj", area:"Kukma, Bhuj", address:"Padheda Vistar, Kukma, Bhuj, Kachchh", phone:"", email:"", ownerName:"" },

  // ════════════════════════════════
  // MANDVI & NAKHATRANA
  // ════════════════════════════════

  { name:"Veeha Boutique", slug:"veeha-boutique-mandvi", category:"salons", idea:6, town:"Mandvi", area:"Babavadi Road, Mandvi", address:"Babavadi Road, Mandvi, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Neelkanth Hardware Store", slug:"neelkanth-hardware-nakhatrana", category:"general", idea:11, town:"Nakhatrana", area:"Super Market, Nakhatrana", address:"Super Market, Nakhatrana, Kutch, Kachchh", phone:"", email:"", ownerName:"" },
  { name:"Mahalaxmi Hardware", slug:"mahalaxmi-hardware-nakhatrana", category:"general", idea:11, town:"Nakhatrana", area:"Netra, Nakhatrana", address:"Netra, Nakhatrana, Kutch, Kachchh", phone:"", email:"", ownerName:"" },

];

// ═══════════════════════════════════════
// CATEGORY META
// ═══════════════════════════════════════

const categoryMeta = {
  salons:    { label:"Salon & Boutique",       icon:"💇", ideaLabel:"Caption Generator",  color:"#e91e8c" },
  "it-tech": { label:"IT & Placement",         icon:"💻", ideaLabel:"AI Tools / Job Board", color:"#1e88e5" },
  cas:       { label:"CA & Accountants",       icon:"📊", ideaLabel:"Expense Tracker",    color:"#ff9800" },
  events:    { label:"Photography & Events",   icon:"📸", ideaLabel:"Mini CRM / Ticketing", color:"#9c27b0" },
  "pg-hostel":{ label:"PG & Hostel",           icon:"🏠", ideaLabel:"PG Listing Platform", color:"#009688" },
  general:   { label:"Local Business",         icon:"🏪", ideaLabel:"Directory / Reviews",  color:"#607d8b" },
};

// ═══════════════════════════════════════
// MICROSITE HTML TEMPLATE
// ═══════════════════════════════════════

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function generateMicrositeHtml(b) {
  const cat = categoryMeta[b.category] || categoryMeta.general;
  const phoneLink = b.phone ? `<a href="tel:${b.phone}" style="color:#ff671f;text-decoration:none">📞 ${b.phone}</a>` : '';
  const emailLink = b.email ? `<a href="mailto:${b.email}" style="color:#ff671f;text-decoration:none">✉️ ${b.email}</a>` : '';
  const contactInfo = phoneLink || emailLink || '<span style="color:#888">Contact via directory</span>';
  const ownerRow = b.ownerName ? `<div style="margin-top:12px;color:#aaa">👤 Owner: <strong style="color:#fff">${escHtml(b.ownerName)}</strong></div>` : '';
  const estRow = b.estYear ? `<div style="margin-top:8px;color:#aaa">📅 Est. ${b.estYear}</div>` : '';
  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(b.address)}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${escHtml(b.name)} — Kutch Digital Map</title>
<meta name="description" content="${escHtml(b.name)} in ${escHtml(b.town)}, Kutch. ${escHtml(cat.label)} listed on Kutch Digital Map.">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--brand:#ff671f;--bg:#000;--surface:#111;--surface2:#1a1a1a;--border:#252525;--text:#fff;--muted:#888}
body{background:var(--bg);color:var(--text);font-family:'Outfit',sans-serif;line-height:1.6;min-height:100vh}
.topbar{position:sticky;top:0;z-index:100;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:14px 24px;display:flex;justify-content:space-between;align-items:center;gap:12px}
.topbar-name{font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}
.cat-pill{font-size:11px;padding:4px 12px;border-radius:20px;background:${cat.color}22;color:${cat.color};border:1px solid ${cat.color}44;white-space:nowrap}
.claim-top-btn{font-size:11px;padding:6px 16px;border-radius:4px;background:var(--brand);color:#000;border:none;font-weight:600;cursor:pointer;white-space:nowrap;transition:0.2s}
.claim-top-btn:hover{filter:brightness(1.15)}
.hero{padding:60px 24px 40px;border-bottom:1px solid var(--border);position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-50%;right:-30%;width:500px;height:500px;background:radial-gradient(circle,${cat.color}15 0%,transparent 70%);pointer-events:none}
.hero h1{font-size:clamp(28px,6vw,48px);font-weight:700;color:var(--brand);line-height:1.15;margin-bottom:12px;position:relative}
.hero-tagline{font-size:16px;color:var(--muted);margin-bottom:16px;position:relative}
.breadcrumb{font-size:13px;color:var(--muted);position:relative}
.breadcrumb span{color:var(--brand)}
.section{padding:32px 24px;border-bottom:1px solid var(--border)}
.section-title{font-size:11px;text-transform:uppercase;letter-spacing:2px;color:var(--muted);margin-bottom:20px}
.info-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:24px}
.info-row{padding:12px 0;border-bottom:1px solid var(--border);font-size:15px}
.info-row:last-child{border-bottom:none}
.info-row a{color:var(--brand);text-decoration:none}
.info-row a:hover{text-decoration:underline}
.upgrade-banner{background:linear-gradient(135deg,#ff671f15,#ff980015);border:1px solid #ff980033;border-radius:8px;padding:24px;text-align:center}
.upgrade-banner h3{color:#ff9800;font-size:18px;margin-bottom:8px}
.upgrade-banner p{color:var(--muted);font-size:14px;margin-bottom:16px}
.upgrade-banner button{background:var(--brand);color:#000;border:none;padding:10px 24px;border-radius:4px;font-weight:600;cursor:pointer;font-size:14px;transition:0.2s}
.upgrade-banner button:hover{filter:brightness(1.15)}
.map-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:24px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-decoration:none;color:var(--text);transition:0.2s}
.map-card:hover{border-color:var(--brand);background:var(--surface2)}
.map-card-text{font-size:16px;font-weight:500}
.map-card-arrow{font-size:20px;color:var(--brand)}
.footer{padding:32px 24px;text-align:center;color:var(--muted);font-size:13px;border-top:1px solid var(--border)}
.footer a{color:var(--brand);text-decoration:none}
.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:200;align-items:center;justify-content:center;padding:20px}
.modal-overlay.active{display:flex}
.modal-box{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:32px;max-width:420px;width:100%}
.modal-box h2{font-size:22px;margin-bottom:16px;color:var(--brand)}
.modal-box input,.modal-box textarea{width:100%;padding:12px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:4px;margin-bottom:12px;font-family:'Outfit',sans-serif;font-size:14px}
.modal-box textarea{height:80px;resize:vertical}
.modal-box .submit-btn{width:100%;padding:12px;background:var(--brand);color:#000;border:none;border-radius:4px;font-weight:600;font-size:15px;cursor:pointer;transition:0.2s}
.modal-box .submit-btn:hover{filter:brightness(1.15)}
.modal-box .cancel-btn{width:100%;padding:8px;background:none;border:none;color:var(--muted);cursor:pointer;margin-top:8px;font-size:13px}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1a1a1a;border:1px solid #333;color:#4ade80;padding:12px 24px;border-radius:6px;font-size:14px;z-index:300;opacity:0;transition:opacity 0.3s}
.toast.show{opacity:1}
@media(max-width:600px){.topbar{padding:12px 16px}.hero{padding:40px 16px 30px}.section{padding:24px 16px}}
</style>
</head>
<body>

<div class="topbar">
  <div class="topbar-name">${escHtml(b.name)}</div>
  <span class="cat-pill">${cat.icon} ${escHtml(cat.label)}</span>
  <button class="claim-top-btn" onclick="openModal()">CLAIM LISTING</button>
</div>

<div class="hero">
  <h1>${escHtml(b.name)}</h1>
  <div class="hero-tagline">${cat.icon} ${escHtml(cat.label)} — ${escHtml(cat.ideaLabel)}</div>
  <div class="breadcrumb">Kutch → <span>${escHtml(b.town)}</span> → ${escHtml(cat.label)}</div>
</div>

<div class="section">
  <div class="section-title">Business Information</div>
  <div class="info-card">
    <div class="info-row">📍 ${escHtml(b.address)}</div>
    <div class="info-row">${contactInfo}</div>
    ${ownerRow}
    ${estRow}
  </div>
</div>

<div class="section">
  <div class="section-title">Digital Presence</div>
  <div class="upgrade-banner">
    <h3>⚡ Unclaimed Listing</h3>
    <p>This business hasn't claimed their digital presence. Are you the owner? Claim this listing to update your information and unlock digital tools.</p>
    <button onclick="openModal()">Claim This Listing</button>
  </div>
</div>

<div class="section">
  <div class="section-title">Location</div>
  <a href="${mapUrl}" target="_blank" rel="noopener" class="map-card">
    <div class="map-card-text">📍 VIEW ON MAP →</div>
    <div class="map-card-arrow">↗</div>
  </a>
</div>

<footer class="footer">
  Powered by <a href="https://via-decide.github.io/Business-Directory/">Kutch Digital Map</a> · ${escHtml(b.town)}, Kachchh
</footer>

<div class="modal-overlay" id="claimModal">
  <div class="modal-box">
    <h2>Claim This Listing</h2>
    <input type="text" id="claimName" placeholder="Your Full Name">
    <input type="tel" id="claimPhone" placeholder="Phone Number">
    <input type="email" id="claimEmail" placeholder="Email Address">
    <textarea id="claimMsg" placeholder="Message (optional)"></textarea>
    <button class="submit-btn" onclick="submitClaim()">Submit Claim Request</button>
    <button class="cancel-btn" onclick="closeModal()">Cancel</button>
  </div>
</div>

<div class="toast" id="toast">✅ Claim request submitted!</div>

<script>
function openModal(){document.getElementById('claimModal').classList.add('active')}
function closeModal(){document.getElementById('claimModal').classList.remove('active')}
function submitClaim(){
  closeModal();
  var t=document.getElementById('toast');t.classList.add('show');
  setTimeout(function(){t.classList.remove('show')},3000);
}
document.getElementById('claimModal').addEventListener('click',function(e){if(e.target===this)closeModal()});
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════
// GENERATE FILES
// ═══════════════════════════════════════

const sitesDir = path.join(__dirname, '..', 'sites');

// Ensure sites directory exists
if (!fs.existsSync(sitesDir)) {
  fs.mkdirSync(sitesDir, { recursive: true });
}

// Clean existing HTML files in sites/
const existing = fs.readdirSync(sitesDir).filter(f => f.endsWith('.html'));
existing.forEach(f => fs.unlinkSync(path.join(sitesDir, f)));

console.log(`Generating ${businesses.length} microsites...`);

businesses.forEach((b, i) => {
  const html = generateMicrositeHtml(b);
  const filePath = path.join(sitesDir, `${b.slug}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
});

console.log(`✅ Generated ${businesses.length} microsite HTML files in sites/`);

// Generate index.json
const indexJson = businesses.map(b => ({
  slug: b.slug,
  name: b.name,
  category: b.category,
  idea: b.idea,
  town: b.town,
  area: b.area,
  address: b.address,
  phone: b.phone,
  email: b.email,
  ownerName: b.ownerName,
  url: `https://via-decide.github.io/Business-Directory/sites/${b.slug}.html`
}));

fs.writeFileSync(path.join(sitesDir, 'index.json'), JSON.stringify(indexJson, null, 2), 'utf8');
console.log(`✅ Generated sites/index.json with ${indexJson.length} entries`);

// Export for validation
if (typeof module !== 'undefined') {
  module.exports = { businesses, categoryMeta };
}
