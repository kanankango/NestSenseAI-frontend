"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Edit2,
  Upload,
  Save,
  Menu,
  Home,
  Activity,
  Apple,
  BookOpen,
  Users,
  User,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Calendar,
  Baby,
  Target,
  Clock,
} from "lucide-react"

// Define a type for locationData
type LocationData = {
  [country: string]: {
    states: string[]
    cities: {
      [state: string]: string[]
    }
  }
}

const locationData: LocationData = {
  "United States": {
    states: [
      "California",
      "New York",
      "Texas",
      "Florida",
      "Illinois",
      "Pennsylvania",
      "Ohio",
      "Georgia",
      "North Carolina",
      "Michigan",
    ],
    cities: {
      California: [
        "Los Angeles",
        "San Francisco",
        "San Diego",
        "Sacramento",
        "San Jose",
        "Fresno",
        "Long Beach",
        "Oakland",
        "Bakersfield",
        "Anaheim",
      ],
      "New York": [
        "New York City",
        "Buffalo",
        "Albany",
        "Rochester",
        "Syracuse",
        "Yonkers",
        "Schenectady",
        "Utica",
        "White Plains",
        "Troy",
      ],
      Texas: [
        "Houston",
        "Austin",
        "Dallas",
        "San Antonio",
        "Fort Worth",
        "El Paso",
        "Arlington",
        "Corpus Christi",
        "Plano",
        "Lubbock",
      ],
      Florida: [
        "Miami",
        "Orlando",
        "Tampa",
        "Jacksonville",
        "St. Petersburg",
        "Hialeah",
        "Tallahassee",
        "Fort Lauderdale",
        "Port St. Lucie",
        "Cape Coral",
      ],
      Illinois: [
        "Chicago",
        "Aurora",
        "Rockford",
        "Joliet",
        "Naperville",
        "Springfield",
        "Peoria",
        "Elgin",
        "Waukegan",
        "Cicero",
      ],
      Pennsylvania: [
        "Philadelphia",
        "Pittsburgh",
        "Allentown",
        "Erie",
        "Reading",
        "Scranton",
        "Bethlehem",
        "Lancaster",
        "Harrisburg",
        "Altoona",
      ],
      Ohio: [
        "Columbus",
        "Cleveland",
        "Cincinnati",
        "Toledo",
        "Akron",
        "Dayton",
        "Parma",
        "Canton",
        "Youngstown",
        "Lorain",
      ],
      Georgia: [
        "Atlanta",
        "Augusta",
        "Columbus",
        "Savannah",
        "Athens",
        "Sandy Springs",
        "Roswell",
        "Macon",
        "Johns Creek",
        "Albany",
      ],
      "North Carolina": [
        "Charlotte",
        "Raleigh",
        "Greensboro",
        "Durham",
        "Winston-Salem",
        "Fayetteville",
        "Cary",
        "Wilmington",
        "High Point",
        "Asheville",
      ],
      Michigan: [
        "Detroit",
        "Grand Rapids",
        "Warren",
        "Sterling Heights",
        "Lansing",
        "Ann Arbor",
        "Flint",
        "Dearborn",
        "Livonia",
        "Westland",
      ],
    },
  },
  "United Kingdom": {
    states: ["England", "Scotland", "Wales", "Northern Ireland"],
    cities: {
      England: [
        "London",
        "Manchester",
        "Birmingham",
        "Liverpool",
        "Leeds",
        "Sheffield",
        "Bristol",
        "Newcastle",
        "Nottingham",
        "Leicester",
      ],
      Scotland: [
        "Edinburgh",
        "Glasgow",
        "Aberdeen",
        "Dundee",
        "Stirling",
        "Perth",
        "Inverness",
        "Paisley",
        "East Kilbride",
        "Hamilton",
      ],
      Wales: [
        "Cardiff",
        "Swansea",
        "Newport",
        "Wrexham",
        "Barry",
        "Caerphilly",
        "Bridgend",
        "Neath",
        "Port Talbot",
        "Cwmbran",
      ],
      "Northern Ireland": [
        "Belfast",
        "Derry",
        "Lisburn",
        "Newtownabbey",
        "Bangor",
        "Craigavon",
        "Castlereagh",
        "Ballymena",
        "Newtownards",
        "Carrickfergus",
      ],
    },
  },
  Canada: {
    states: [
      "Ontario",
      "British Columbia",
      "Quebec",
      "Alberta",
      "Manitoba",
      "Saskatchewan",
      "Nova Scotia",
      "New Brunswick",
      "Newfoundland and Labrador",
      "Prince Edward Island",
    ],
    cities: {
      Ontario: [
        "Toronto",
        "Ottawa",
        "Hamilton",
        "London",
        "Kitchener",
        "Windsor",
        "Oshawa",
        "Barrie",
        "Guelph",
        "Kingston",
      ],
      "British Columbia": [
        "Vancouver",
        "Victoria",
        "Surrey",
        "Burnaby",
        "Richmond",
        "Abbotsford",
        "Coquitlam",
        "Kelowna",
        "Saanich",
        "Delta",
      ],
      Quebec: [
        "Montreal",
        "Quebec City",
        "Laval",
        "Gatineau",
        "Longueuil",
        "Sherbrooke",
        "Saguenay",
        "Trois-Rivières",
        "Terrebonne",
        "Saint-Jean-sur-Richelieu",
      ],
      Alberta: [
        "Calgary",
        "Edmonton",
        "Red Deer",
        "Lethbridge",
        "St. Albert",
        "Medicine Hat",
        "Grande Prairie",
        "Airdrie",
        "Spruce Grove",
        "Okotoks",
      ],
      Manitoba: [
        "Winnipeg",
        "Brandon",
        "Steinbach",
        "Thompson",
        "Portage la Prairie",
        "Winkler",
        "Selkirk",
        "Morden",
        "Dauphin",
        "The Pas",
      ],
      Saskatchewan: [
        "Saskatoon",
        "Regina",
        "Prince Albert",
        "Moose Jaw",
        "Swift Current",
        "Yorkton",
        "North Battleford",
        "Estevan",
        "Weyburn",
        "Lloydminster",
      ],
      "Nova Scotia": [
        "Halifax",
        "Sydney",
        "Dartmouth",
        "Truro",
        "New Glasgow",
        "Glace Bay",
        "Kentville",
        "Amherst",
        "Yarmouth",
        "Bridgewater",
      ],
      "New Brunswick": [
        "Saint John",
        "Moncton",
        "Fredericton",
        "Dieppe",
        "Riverview",
        "Campbellton",
        "Edmundston",
        "Bathurst",
        "Miramichi",
        "Sackville",
      ],
      "Newfoundland and Labrador": [
        "St. John's",
        "Mount Pearl",
        "Corner Brook",
        "Conception Bay South",
        "Grand Falls-Windsor",
        "Paradise",
        "Happy Valley-Goose Bay",
        "Gander",
        "Portugal Cove-St. Philip's",
        "Torbay",
      ],
      "Prince Edward Island": [
        "Charlottetown",
        "Summerside",
        "Stratford",
        "Cornwall",
        "Montague",
        "Kensington",
        "Souris",
        "Alberton",
        "Georgetown",
        "Tignish",
      ],
    },
  },
  Australia: {
    states: [
      "New South Wales",
      "Victoria",
      "Queensland",
      "Western Australia",
      "South Australia",
      "Tasmania",
      "Australian Capital Territory",
      "Northern Territory",
    ],
    cities: {
      "New South Wales": [
        "Sydney",
        "Newcastle",
        "Wollongong",
        "Central Coast",
        "Maitland",
        "Albury",
        "Wagga Wagga",
        "Port Macquarie",
        "Tamworth",
        "Orange",
      ],
      Victoria: [
        "Melbourne",
        "Geelong",
        "Ballarat",
        "Bendigo",
        "Frankston",
        "Mildura",
        "Shepparton",
        "Warrnambool",
        "Pakenham",
        "Sunbury",
      ],
      Queensland: [
        "Brisbane",
        "Gold Coast",
        "Townsville",
        "Cairns",
        "Toowoomba",
        "Rockhampton",
        "Mackay",
        "Bundaberg",
        "Hervey Bay",
        "Gladstone",
      ],
      "Western Australia": [
        "Perth",
        "Fremantle",
        "Rockingham",
        "Mandurah",
        "Bunbury",
        "Kalgoorlie",
        "Geraldton",
        "Albany",
        "Busselton",
        "Ellenbrook",
      ],
      "South Australia": [
        "Adelaide",
        "Mount Gambier",
        "Whyalla",
        "Murray Bridge",
        "Port Lincoln",
        "Port Pirie",
        "Victor Harbor",
        "Gawler",
        "Port Augusta",
        "Kadina",
      ],
      Tasmania: [
        "Hobart",
        "Launceston",
        "Devonport",
        "Burnie",
        "Somerset",
        "Wynyard",
        "New Norfolk",
        "Kingston",
        "Ulverstone",
        "George Town",
      ],
      "Australian Capital Territory": [
        "Canberra",
        "Queanbeyan",
        "Gungahlin",
        "Tuggeranong",
        "Woden",
        "Belconnen",
        "Weston Creek",
        "Molonglo Valley",
      ],
      "Northern Territory": [
        "Darwin",
        "Alice Springs",
        "Palmerston",
        "Katherine",
        "Nhulunbuy",
        "Tennant Creek",
        "Casuarina",
        "Marrara",
        "Tiwi",
        "Humpty Doo",
      ],
    },
  },
  India: {
    states: [
      "Maharashtra",
      "Karnataka",
      "Tamil Nadu",
      "Delhi",
      "Gujarat",
      "Rajasthan",
      "West Bengal",
      "Uttar Pradesh",
      "Telangana",
      "Kerala",
    ],
    cities: {
      Maharashtra: [
        "Mumbai",
        "Pune",
        "Nagpur",
        "Nashik",
        "Aurangabad",
        "Solapur",
        "Amravati",
        "Kolhapur",
        "Sangli",
        "Jalgaon",
      ],
      Karnataka: [
        "Bangalore",
        "Mysore",
        "Hubli",
        "Mangalore",
        "Belgaum",
        "Gulbarga",
        "Davanagere",
        "Bellary",
        "Bijapur",
        "Shimoga",
      ],
      "Tamil Nadu": [
        "Chennai",
        "Coimbatore",
        "Madurai",
        "Tiruchirappalli",
        "Salem",
        "Tirunelveli",
        "Erode",
        "Vellore",
        "Thoothukudi",
        "Dindigul",
      ],
      Delhi: [
        "New Delhi",
        "Delhi Cantonment",
        "North Delhi",
        "South Delhi",
        "East Delhi",
        "West Delhi",
        "Central Delhi",
        "North East Delhi",
        "North West Delhi",
        "South West Delhi",
      ],
      Gujarat: [
        "Ahmedabad",
        "Surat",
        "Vadodara",
        "Rajkot",
        "Bhavnagar",
        "Jamnagar",
        "Junagadh",
        "Gandhinagar",
        "Anand",
        "Navsari",
      ],
      Rajasthan: [
        "Jaipur",
        "Jodhpur",
        "Kota",
        "Bikaner",
        "Ajmer",
        "Udaipur",
        "Bhilwara",
        "Alwar",
        "Bharatpur",
        "Sikar",
      ],
      "West Bengal": [
        "Kolkata",
        "Howrah",
        "Durgapur",
        "Asansol",
        "Siliguri",
        "Malda",
        "Bardhaman",
        "Baharampur",
        "Habra",
        "Kharagpur",
      ],
      "Uttar Pradesh": [
        "Lucknow",
        "Kanpur",
        "Ghaziabad",
        "Agra",
        "Meerut",
        "Varanasi",
        "Allahabad",
        "Bareilly",
        "Aligarh",
        "Moradabad",
      ],
      Telangana: [
        "Hyderabad",
        "Warangal",
        "Nizamabad",
        "Khammam",
        "Karimnagar",
        "Ramagundam",
        "Mahbubnagar",
        "Nalgonda",
        "Adilabad",
        "Suryapet",
      ],
      Kerala: [
        "Thiruvananthapuram",
        "Kochi",
        "Kozhikode",
        "Thrissur",
        "Kollam",
        "Palakkad",
        "Alappuzha",
        "Malappuram",
        "Kannur",
        "Kasaragod",
      ],
    },
  },
  Germany: {
    states: [
      "Bavaria",
      "Baden-Württemberg",
      "North Rhine-Westphalia",
      "Hesse",
      "Saxony",
      "Lower Saxony",
      "Rhineland-Palatinate",
      "Berlin",
      "Schleswig-Holstein",
      "Brandenburg",
    ],
    cities: {
      Bavaria: [
        "Munich",
        "Nuremberg",
        "Augsburg",
        "Würzburg",
        "Regensburg",
        "Ingolstadt",
        "Fürth",
        "Erlangen",
        "Bayreuth",
        "Bamberg",
      ],
      "Baden-Württemberg": [
        "Stuttgart",
        "Mannheim",
        "Karlsruhe",
        "Freiburg",
        "Heidelberg",
        "Ulm",
        "Heilbronn",
        "Pforzheim",
        "Reutlingen",
        "Esslingen",
      ],
      "North Rhine-Westphalia": [
        "Cologne",
        "Düsseldorf",
        "Dortmund",
        "Essen",
        "Duisburg",
        "Bochum",
        "Wuppertal",
        "Bielefeld",
        "Bonn",
        "Münster",
      ],
      Hesse: [
        "Frankfurt",
        "Wiesbaden",
        "Kassel",
        "Darmstadt",
        "Offenbach",
        "Hanau",
        "Marburg",
        "Gießen",
        "Fulda",
        "Rüsselsheim",
      ],
      Saxony: [
        "Dresden",
        "Leipzig",
        "Chemnitz",
        "Zwickau",
        "Plauen",
        "Görlitz",
        "Freiberg",
        "Bautzen",
        "Meissen",
        "Riesa",
      ],
      "Lower Saxony": [
        "Hanover",
        "Braunschweig",
        "Oldenburg",
        "Osnabrück",
        "Wolfsburg",
        "Göttingen",
        "Salzgitter",
        "Hildesheim",
        "Delmenhorst",
        "Wilhelmshaven",
      ],
      "Rhineland-Palatinate": [
        "Mainz",
        "Ludwigshafen",
        "Koblenz",
        "Trier",
        "Kaiserslautern",
        "Worms",
        "Neuwied",
        "Speyer",
        "Frankenthal",
        "Bad Kreuznach",
      ],
      Berlin: [
        "Mitte",
        "Charlottenburg-Wilmersdorf",
        "Pankow",
        "Tempelhof-Schöneberg",
        "Steglitz-Zehlendorf",
        "Neukölln",
        "Friedrichshain-Kreuzberg",
        "Spandau",
        "Treptow-Köpenick",
        "Marzahn-Hellersdorf",
      ],
      "Schleswig-Holstein": [
        "Kiel",
        "Lübeck",
        "Flensburg",
        "Neumünster",
        "Norderstedt",
        "Elmshorn",
        "Pinneberg",
        "Wedel",
        "Ahrensburg",
        "Geesthacht",
      ],
      Brandenburg: [
        "Potsdam",
        "Cottbus",
        "Brandenburg",
        "Frankfurt (Oder)",
        "Oranienburg",
        "Falkensee",
        "Königs Wusterhausen",
        "Eberswalde",
        "Eisenhüttenstadt",
        "Rathenow",
      ],
    },
  },
  France: {
    states: [
      "Île-de-France",
      "Provence-Alpes-Côte d'Azur",
      "Auvergne-Rhône-Alpes",
      "Nouvelle-Aquitaine",
      "Occitanie",
      "Hauts-de-France",
      "Normandy",
      "Grand Est",
      "Pays de la Loire",
      "Brittany",
    ],
    cities: {
      "Île-de-France": [
        "Paris",
        "Boulogne-Billancourt",
        "Saint-Denis",
        "Argenteuil",
        "Versailles",
        "Montreuil",
        "Créteil",
        "Nanterre",
        "Courbevoie",
        "Colombes",
      ],
      "Provence-Alpes-Côte d'Azur": [
        "Marseille",
        "Nice",
        "Toulon",
        "Aix-en-Provence",
        "Avignon",
        "Antibes",
        "Cannes",
        "La Seyne-sur-Mer",
        "Hyères",
        "Arles",
      ],
      "Auvergne-Rhône-Alpes": [
        "Lyon",
        "Saint-Étienne",
        "Grenoble",
        "Villeurbanne",
        "Clermont-Ferrand",
        "Vénissieux",
        "Chambéry",
        "Valence",
        "Annecy",
        "Bourg-en-Bresse",
      ],
      "Nouvelle-Aquitaine": [
        "Bordeaux",
        "Limoges",
        "Poitiers",
        "Pau",
        "La Rochelle",
        "Mérignac",
        "Pessac",
        "Bayonne",
        "Angoulême",
        "Niort",
      ],
      Occitanie: [
        "Toulouse",
        "Montpellier",
        "Nîmes",
        "Perpignan",
        "Béziers",
        "Narbonne",
        "Carcassonne",
        "Albi",
        "Tarbes",
        "Castres",
      ],
      "Hauts-de-France": [
        "Lille",
        "Amiens",
        "Tourcoing",
        "Roubaix",
        "Dunkerque",
        "Calais",
        "Villeneuve-d'Ascq",
        "Saint-Quentin",
        "Beauvais",
        "Arras",
      ],
      Normandy: [
        "Le Havre",
        "Rouen",
        "Caen",
        "Cherbourg",
        "Évreux",
        "Dieppe",
        "Sotteville-lès-Rouen",
        "Saint-Étienne-du-Rouvray",
        "Alençon",
        "Lisieux",
      ],
      "Grand Est": [
        "Strasbourg",
        "Metz",
        "Nancy",
        "Reims",
        "Mulhouse",
        "Colmar",
        "Troyes",
        "Charleville-Mézières",
        "Thionville",
        "Épinal",
      ],
      "Pays de la Loire": [
        "Nantes",
        "Angers",
        "Le Mans",
        "Saint-Nazaire",
        "Cholet",
        "La Roche-sur-Yon",
        "Laval",
        "Saumur",
        "Rezé",
        "Saint-Sébastien-sur-Loire",
      ],
      Brittany: [
        "Rennes",
        "Brest",
        "Quimper",
        "Lorient",
        "Vannes",
        "Saint-Malo",
        "Saint-Brieuc",
        "Lanester",
        "Fougères",
        "Concarneau",
      ],
    },
  },
  Japan: {
    states: ["Tokyo", "Osaka", "Kanagawa", "Aichi", "Saitama", "Chiba", "Hyogo", "Hokkaido", "Fukuoka", "Kyoto"],
    cities: {
      Tokyo: [
        "Shibuya",
        "Shinjuku",
        "Harajuku",
        "Ginza",
        "Akihabara",
        "Roppongi",
        "Asakusa",
        "Ikebukuro",
        "Ueno",
        "Odaiba",
      ],
      Osaka: [
        "Osaka City",
        "Sakai",
        "Higashiosaka",
        "Hirakata",
        "Toyonaka",
        "Suita",
        "Takatsuki",
        "Yao",
        "Neyagawa",
        "Kishiwada",
      ],
      Kanagawa: [
        "Yokohama",
        "Kawasaki",
        "Sagamihara",
        "Fujisawa",
        "Chigasaki",
        "Hiratsuka",
        "Machida",
        "Koganei",
        "Yamato",
        "Fujisawa",
      ],
      Aichi: [
        "Nagoya",
        "Toyota",
        "Okazaki",
        "Ichinomiya",
        "Kasugai",
        "Anjo",
        "Toyohashi",
        "Nishio",
        "Komaki",
        "Kariya",
      ],
      Saitama: [
        "Saitama City",
        "Kawaguchi",
        "Kawagoe",
        "Tokorozawa",
        "Koshigaya",
        "Ageo",
        "Kasukabe",
        "Kumagaya",
        "Misato",
        "Iruma",
      ],
      Chiba: [
        "Chiba City",
        "Funabashi",
        "Matsudo",
        "Ichikawa",
        "Kashiwa",
        "Ichihara",
        "Yachiyo",
        "Abiko",
        "Kamagaya",
        "Kisarazu",
      ],
      Hyogo: [
        "Kobe",
        "Himeji",
        "Nishinomiya",
        "Amagasaki",
        "Akashi",
        "Kakogawa",
        "Takarazuka",
        "Itami",
        "Sanda",
        "Ashiya",
      ],
      Hokkaido: [
        "Sapporo",
        "Asahikawa",
        "Hakodate",
        "Kushiro",
        "Tomakomai",
        "Obihiro",
        "Otaru",
        "Kitami",
        "Ebetsu",
        "Muroran",
      ],
      Fukuoka: [
        "Fukuoka City",
        "Kitakyushu",
        "Kurume",
        "Omuta",
        "Iizuka",
        "Tagawa",
        "Yanagawa",
        "Yame",
        "Chikugo",
        "Okawa",
      ],
      Kyoto: [
        "Kyoto City",
        "Uji",
        "Kameoka",
        "Joyo",
        "Muko",
        "Nagaokakyo",
        "Kyotanabe",
        "Yawata",
        "Kyotango",
        "Nantan",
      ],
    },
  },
  Brazil: {
    states: [
      "São Paulo",
      "Rio de Janeiro",
      "Minas Gerais",
      "Bahia",
      "Paraná",
      "Rio Grande do Sul",
      "Pernambuco",
      "Ceará",
      "Pará",
      "Santa Catarina",
    ],
    cities: {
      "São Paulo": [
        "São Paulo",
        "Guarulhos",
        "Campinas",
        "São Bernardo do Campo",
        "Santo André",
        "Osasco",
        "Ribeirão Preto",
        "Sorocaba",
        "Mauá",
        "São José dos Campos",
      ],
      "Rio de Janeiro": [
        "Rio de Janeiro",
        "São Gonçalo",
        "Duque de Caxias",
        "Nova Iguaçu",
        "Niterói",
        "Belford Roxo",
        "São João de Meriti",
        "Campos dos Goytacazes",
        "Petrópolis",
        "Volta Redonda",
      ],
      "Minas Gerais": [
        "Belo Horizonte",
        "Uberlândia",
        "Contagem",
        "Juiz de Fora",
        "Betim",
        "Montes Claros",
        "Ribeirão das Neves",
        "Uberaba",
        "Governador Valadares",
        "Ipatinga",
      ],
      Bahia: [
        "Salvador",
        "Feira de Santana",
        "Vitória da Conquista",
        "Camaçari",
        "Juazeiro",
        "Ilhéus",
        "Itabuna",
        "Lauro de Freitas",
        "Jequié",
        "Teixeira de Freitas",
      ],
      Paraná: [
        "Curitiba",
        "Londrina",
        "Maringá",
        "Ponta Grossa",
        "Cascavel",
        "São José dos Pinhais",
        "Foz do Iguaçu",
        "Colombo",
        "Guarapuava",
        "Paranaguá",
      ],
      "Rio Grande do Sul": [
        "Porto Alegre",
        "Caxias do Sul",
        "Pelotas",
        "Canoas",
        "Santa Maria",
        "Gravataí",
        "Viamão",
        "Novo Hamburgo",
        "São Leopoldo",
        "Rio Grande",
      ],
      Pernambuco: [
        "Recife",
        "Jaboatão dos Guararapes",
        "Olinda",
        "Caruaru",
        "Petrolina",
        "Paulista",
        "Cabo de Santo Agostinho",
        "Camaragibe",
        "Garanhuns",
        "Vitória de Santo Antão",
      ],
      Ceará: [
        "Fortaleza",
        "Caucaia",
        "Juazeiro do Norte",
        "Maracanaú",
        "Sobral",
        "Crato",
        "Itapipoca",
        "Maranguape",
        "Iguatu",
        "Quixadá",
      ],
      Pará: [
        "Belém",
        "Ananindeua",
        "Santarém",
        "Marabá",
        "Parauapebas",
        "Castanhal",
        "Abaetetuba",
        "Cametá",
        "Marituba",
        "Bragança",
      ],
      "Santa Catarina": [
        "Joinville",
        "Florianópolis",
        "Blumenau",
        "São José",
        "Criciúma",
        "Chapecó",
        "Itajaí",
        "Lages",
        "Jaraguá do Sul",
        "Palhoça",
      ],
    },
  },
  Mexico: {
    states: [
      "Mexico City",
      "State of Mexico",
      "Jalisco",
      "Nuevo León",
      "Puebla",
      "Guanajuato",
      "Chihuahua",
      "Baja California",
      "Michoacán",
      "Oaxaca",
    ],
    cities: {
      "Mexico City": [
        "Mexico City",
        "Iztapalapa",
        "Ecatepec",
        "Guadalajara",
        "Puebla",
        "Tijuana",
        "León",
        "Zapopan",
        "Monterrey",
        "Nezahualcóyotl",
      ],
      "State of Mexico": [
        "Ecatepec",
        "Nezahualcóyotl",
        "Naucalpan",
        "Tlalnepantla",
        "Chimalhuacán",
        "Toluca",
        "Atizapán de Zaragoza",
        "Cuautitlán Izcalli",
        "Tultitlán",
        "Chalco",
      ],
      Jalisco: [
        "Guadalajara",
        "Zapopan",
        "Tlaquepaque",
        "Tonalá",
        "Puerto Vallarta",
        "Tlajomulco de Zúñiga",
        "El Salto",
        "Tepatitlán",
        "Ocotlán",
        "Lagos de Moreno",
      ],
      "Nuevo León": [
        "Monterrey",
        "Guadalupe",
        "San Nicolás de los Garza",
        "Apodaca",
        "General Escobedo",
        "Santa Catarina",
        "San Pedro Garza García",
        "Cadereyta Jiménez",
        "Carmen",
        "Juárez",
      ],
      Puebla: [
        "Puebla",
        "Tehuacán",
        "San Martín Texmelucan",
        "Atlixco",
        "San Pedro Cholula",
        "Amozoc",
        "Huauchinango",
        "Zacatlán",
        "Izúcar de Matamoros",
        "Cuautlancingo",
      ],
      Guanajuato: [
        "León",
        "Irapuato",
        "Celaya",
        "Salamanca",
        "Guanajuato",
        "San Francisco del Rincón",
        "Pénjamo",
        "Valle de Santiago",
        "Acámbaro",
        "Silao",
      ],
      Chihuahua: [
        "Ciudad Juárez",
        "Chihuahua",
        "Delicias",
        "Parral",
        "Cuauhtémoc",
        "Nuevo Casas Grandes",
        "Camargo",
        "Jiménez",
        "Bocoyna",
        "Meoqui",
      ],
      "Baja California": [
        "Tijuana",
        "Mexicali",
        "Ensenada",
        "Rosarito",
        "Tecate",
        "San Felipe",
        "Vicente Guerrero",
        "Guadalupe Victoria",
        "San Quintín",
        "El Rosario",
      ],
      Michoacán: [
        "Morelia",
        "Uruapan",
        "Lázaro Cárdenas",
        "Zamora",
        "Apatzingán",
        "Hidalgo",
        "La Piedad",
        "Pátzcuaro",
        "Sahuayo",
        "Zitácuaro",
      ],
      Oaxaca: [
        "Oaxaca",
        "Salina Cruz",
        "Tuxtepec",
        "Juchitán",
        "Huajuapan de León",
        "Puerto Escondido",
        "Tehuantepec",
        "Pinotepa Nacional",
        "Matías Romero",
        "Miahuatlán",
      ],
    },
  },
}

export default function Profile() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [availableStates, setAvailableStates] = useState<string[]>([])
  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    birthDate: "",
    goals: "",
    country: "",
    state: "",
    city: "",
    weeksSinceChildbirth: "",
    birthType: "Natural",
    birthTiming: "As Planned",
  })

  useEffect(() => {
    if (formData.country) {
      setAvailableStates(locationData[formData.country].states)
      setFormData((prev) => ({ ...prev, state: "", city: "" }))
    }
  }, [formData.country])

  useEffect(() => {
    if (formData.state && formData.country) {
      setAvailableCities(locationData[formData.country].cities[formData.state])
      setFormData((prev) => ({ ...prev, city: "" }))
    }
  }, [formData.state])

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          setProfileImage(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
    setIsEditing(false)
    router.push("/dashboard")
  }

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/wellness-tracker", label: "Wellness Tracker", icon: Activity },
    { href: "/nutrition-exercise", label: "Nutrition & Exercise", icon: Apple },
    { href: "/resources", label: "Resources", icon: BookOpen },
    { href: "/community", label: "Community", icon: Users },
    { href: "/profile", label: "Profile", icon: User, active: true },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Sidebar */}
      <aside
        className={`${isSidebarCollapsed ? "w-20" : "w-72"} transition-all duration-300 bg-white shadow-xl border-r border-[#765133]/10 flex flex-col relative hidden lg:flex`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#765133]/10">
          <div className="flex items-center justify-between">
            {!isSidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#a0845c] text-transparent bg-clip-text">
                  Postpartum
                </h1>
                <p className="text-sm text-gray-600 mt-1">Wellness Platform</p>
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-[#765133]/10 transition-colors text-[#765133]"
            >
              {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    item.active
                      ? "bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white shadow-lg"
                      : "text-gray-600 hover:bg-[#765133]/10 hover:text-[#765133]"
                  }`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon
                    size={20}
                    className={`${item.active ? "text-white" : "text-gray-500 group-hover:text-[#765133]"} transition-colors`}
                  />
                  {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
                  {item.active && !isSidebarCollapsed && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-white/80"></div>
                  )}
                </a>
              )
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        {!isSidebarCollapsed && (
          <div className="p-4 border-t border-[#765133]/10">
            <div className="bg-gradient-to-r from-[#765133]/10 to-[#8b6f47]/10 rounded-xl p-4">
              <h3 className="font-semibold text-[#765133] text-sm mb-1">Profile Status</h3>
              <p className="text-xs text-gray-600 mb-3">Keep your information updated</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#765133] to-[#8b6f47] h-2 rounded-full w-4/5"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">80% Complete</p>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white shadow-xl border-r border-[#765133]/10 transform transition-transform duration-300 z-50 lg:hidden ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Sidebar Header */}
        <div className="p-6 border-b border-[#765133]/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#a0845c] text-transparent bg-clip-text">
                Postpartum
              </h1>
              <p className="text-sm text-gray-600 mt-1">Wellness Platform</p>
            </div>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-[#765133]/10 transition-colors text-[#765133]"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    item.active
                      ? "bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white shadow-lg"
                      : "text-gray-600 hover:bg-[#765133]/10 hover:text-[#765133]"
                  }`}
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <Icon
                    size={20}
                    className={`${item.active ? "text-white" : "text-gray-500 group-hover:text-[#765133]"} transition-colors`}
                  />
                  <span className="font-medium">{item.label}</span>
                  {item.active && <div className="ml-auto w-2 h-2 rounded-full bg-white/80"></div>}
                </a>
              )
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm border-b border-[#765133]/10 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-[#765133]/10 transition-colors text-[#765133]"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-bold bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#a0845c] text-transparent bg-clip-text">
              Your Profile
            </h1>
            <div className="w-10"></div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="text-center mb-8 hidden lg:block">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#765133] to-[#8b6f47] mb-4 shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#a0845c] text-transparent bg-clip-text mb-4">
                  Your Profile
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Manage your personal information and track your postpartum journey
                </p>
              </div>

              {/* Profile Hero Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/20 overflow-hidden">
                <div className="bg-gradient-to-r from-[#765133]/10 to-[#8b6f47]/10 p-8">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Profile Image Section */}
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#765133] to-[#8b6f47] p-1 shadow-2xl">
                        <Avatar className="w-full h-full border-4 border-white">
                          {profileImage ? (
                            <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
                          ) : (
                            <AvatarFallback className="bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white text-3xl font-bold">
                              {formData.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </div>
                      {isEditing && (
                        <label className="absolute bottom-2 right-2 p-3 bg-white rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-[#765133]/20">
                          <Upload className="w-5 h-5 text-[#765133]" />
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                            accept="image/*"
                            title="Upload Profile Image"
                          />
                        </label>
                      )}
                    </div>

                    {/* Profile Stats */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                      <div className="bg-white rounded-2xl p-4 text-center border border-[#765133]/10 shadow-sm">
                        <Clock className="w-6 h-6 text-[#765133] mx-auto mb-2" />
                        <div className="text-xl font-bold text-[#765133] mb-1">
                          {formData.weeksSinceChildbirth || "0"}
                        </div>
                        <div className="text-xs text-gray-600">Weeks Postpartum</div>
                      </div>
                      <div className="bg-white rounded-2xl p-4 text-center border border-[#765133]/10 shadow-sm">
                        <Baby className="w-6 h-6 text-[#765133] mx-auto mb-2" />
                        <div className="text-xl font-bold text-[#765133] mb-1">{formData.birthType || "Not Set"}</div>
                        <div className="text-xs text-gray-600">Birth Type</div>
                      </div>
                      <div className="bg-white rounded-2xl p-4 text-center border border-[#765133]/10 shadow-sm">
                        <Calendar className="w-6 h-6 text-[#765133] mx-auto mb-2" />
                        <div className="text-xl font-bold text-[#765133] mb-1">{formData.age || "0"}</div>
                        <div className="text-xs text-gray-600">Years Old</div>
                      </div>
                      <div className="bg-white rounded-2xl p-4 text-center border border-[#765133]/10 shadow-sm">
                        <MapPin className="w-6 h-6 text-[#765133] mx-auto mb-2" />
                        <div className="text-xl font-bold text-[#765133] mb-1">{formData.city || "Not Set"}</div>
                        <div className="text-xs text-gray-600">Location</div>
                      </div>
                    </div>

                    {/* Edit Button */}
                    <div className="lg:ml-8">
                      <Button
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white hover:from-[#8b6f47] hover:to-[#a0845c] transition-all duration-300 px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Edit2 className="w-5 h-5 mr-2" />
                        {isEditing ? "Cancel Edit" : "Edit Profile"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <form onSubmit={handleSubmit}>
              {isEditing ? (
                /* Edit Mode */
                <div className="space-y-8">
                  {/* Personal Information Card */}
                  <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#765133] to-[#8b6f47] p-6">
                      <h2 className="text-2xl font-bold text-white flex items-center">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        Personal Information
                      </h2>
                    </div>
                    <div className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                            Full Name
                          </label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                            Email Address
                          </label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg"
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">Age</label>
                          <Input
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={(e) => handleChange("age", e.target.value)}
                            className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg"
                            placeholder="25"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Birth Information Card */}
                  <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#765133] to-[#8b6f47] p-6">
                      <h2 className="text-2xl font-bold text-white flex items-center">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                          <Baby className="w-5 h-5 text-white" />
                        </div>
                        Birth Information
                      </h2>
                    </div>
                    <div className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                            Baby's Birth Date
                          </label>
                          <Input
                            name="birthDate"
                            type="date"
                            value={formData.birthDate}
                            onChange={(e) => handleChange("birthDate", e.target.value)}
                            className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                            Weeks Since Birth
                          </label>
                          <Input
                            name="weeksSinceChildbirth"
                            type="number"
                            value={formData.weeksSinceChildbirth}
                            onChange={(e) => handleChange("weeksSinceChildbirth", e.target.value)}
                            className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg"
                            placeholder="8"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                            Type of Birth
                          </label>
                          <Select
                            value={formData.birthType}
                            onValueChange={(value) => handleChange("birthType", value)}
                          >
                            <SelectTrigger className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Natural">Natural Birth</SelectItem>
                              <SelectItem value="C-Section">C-Section</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                            Birth Timing
                          </label>
                          <Select
                            value={formData.birthTiming}
                            onValueChange={(value) => handleChange("birthTiming", value)}
                          >
                            <SelectTrigger className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Premature">Premature</SelectItem>
                              <SelectItem value="As Planned">As Planned</SelectItem>
                              <SelectItem value="Overdue">Overdue</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location Information Card */}
                  <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#765133] to-[#8b6f47] p-6">
                      <h2 className="text-2xl font-bold text-white flex items-center">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        Location Information
                      </h2>
                    </div>
                    <div className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                            Country
                          </label>
                          <Select value={formData.country} onValueChange={(value) => handleChange("country", value)}>
                            <SelectTrigger className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg">
                              <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(locationData).map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {formData.country && (
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                              State/Province
                            </label>
                            <Select value={formData.state} onValueChange={(value) => handleChange("state", value)}>
                              <SelectTrigger className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg">
                                <SelectValue placeholder="Select State" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableStates.map((state) => (
                                  <SelectItem key={state} value={state}>
                                    {state}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {formData.state && (
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">City</label>
                            <Select value={formData.city} onValueChange={(value) => handleChange("city", value)}>
                              <SelectTrigger className="w-full border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-3 px-4 text-lg">
                                <SelectValue placeholder="Select City" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableCities.map((city) => (
                                  <SelectItem key={city} value={city}>
                                    {city}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Recovery Goals Card */}
                  <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#765133] to-[#8b6f47] p-6">
                      <h2 className="text-2xl font-bold text-white flex items-center">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        Recovery Goals
                      </h2>
                    </div>
                    <div className="p-8">
                      <div className="space-y-4">
                        <label className="text-sm font-semibold text-[#765133] uppercase tracking-wide">
                          Your Recovery Goals & Notes
                        </label>
                        <Textarea
                          name="goals"
                          value={formData.goals}
                          onChange={(e) => handleChange("goals", e.target.value)}
                          className="w-full min-h-[150px] border-2 border-[#765133]/20 focus:border-[#765133] focus:ring-[#765133]/20 rounded-xl py-4 px-4 text-lg resize-none"
                          placeholder="Share your recovery goals, what you hope to achieve, any specific areas you'd like to focus on, or notes about your journey..."
                        />
                        <p className="text-sm text-gray-500">
                          This helps us provide more personalized recommendations for your recovery journey.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-center pb-8">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white hover:from-[#8b6f47] hover:to-[#a0845c] transition-all duration-300 px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg font-bold"
                    >
                      <Save className="w-6 h-6 mr-3" />
                      Save All Changes
                    </Button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Personal Information Display */}
                  <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#765133]/10 to-[#8b6f47]/10 p-6 border-b border-[#765133]/10">
                      <h3 className="text-2xl font-bold text-[#765133] flex items-center">
                        <User className="w-6 h-6 mr-3" />
                        Personal Information
                      </h3>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-[#765133]">Name:</span>
                        <span className="text-gray-700 font-medium">{formData.name || "Not set"}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-[#765133]">Email:</span>
                        <span className="text-gray-700 font-medium">{formData.email || "Not set"}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-[#765133]">Age:</span>
                        <span className="text-gray-700 font-medium">{formData.age || "Not set"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Birth Information Display */}
                  <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#765133]/10 to-[#8b6f47]/10 p-6 border-b border-[#765133]/10">
                      <h3 className="text-2xl font-bold text-[#765133] flex items-center">
                        <Baby className="w-6 h-6 mr-3" />
                        Birth Information
                      </h3>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-[#765133]">Birth Date:</span>
                        <span className="text-gray-700 font-medium">{formData.birthDate || "Not set"}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-[#765133]">Weeks Since Birth:</span>
                        <span className="text-gray-700 font-medium">{formData.weeksSinceChildbirth || "Not set"}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-[#765133]">Birth Type:</span>
                        <span className="text-gray-700 font-medium">{formData.birthType}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-[#765133]">Birth Timing:</span>
                        <span className="text-gray-700 font-medium">{formData.birthTiming}</span>
                      </div>
                    </div>
                  </div>

                  {/* Location Information Display */}
                  <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#765133]/10 to-[#8b6f47]/10 p-6 border-b border-[#765133]/10">
                      <h3 className="text-2xl font-bold text-[#765133] flex items-center">
                        <MapPin className="w-6 h-6 mr-3" />
                        Location
                      </h3>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-[#765133]">Country:</span>
                        <span className="text-gray-700 font-medium">{formData.country || "Not set"}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-[#765133]">State:</span>
                        <span className="text-gray-700 font-medium">{formData.state || "Not set"}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-semibold text-[#765133]">City:</span>
                        <span className="text-gray-700 font-medium">{formData.city || "Not set"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recovery Goals Display */}
                  <div className="bg-white rounded-3xl shadow-xl border border-[#765133]/10 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#765133]/10 to-[#8b6f47]/10 p-6 border-b border-[#765133]/10">
                      <h3 className="text-2xl font-bold text-[#765133] flex items-center">
                        <Target className="w-6 h-6 mr-3" />
                        Recovery Goals
                      </h3>
                    </div>
                    <div className="p-8">
                      <div className="bg-gray-50 rounded-2xl p-6 min-h-[120px]">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {formData.goals ||
                            "No recovery goals set yet. Click 'Edit Profile' to add your goals and help us provide personalized recommendations."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
