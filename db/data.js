
const data = {
    base_units: [
        {
            unit_type: "length",
            base_unit: "meter",
            symbol: "m",
            measures: "distance light travels in vacuum in 1/299792458 seconds",
            measuring_instruments: ["ruler", "tape measure", "caliper", "micrometer", "laser rangefinder", "GPS"],
            conversions: {
                kilometer: { symbol: "km", formula: "1 km = 1000 m" },
                centimeter: { symbol: "cm", formula: "1 cm = 0.01 m" },
                millimeter: { symbol: "mm", formula: "1 mm = 0.001 m" },
                micrometer: { symbol: "μm", formula: "1 μm = 1e-6 m" },
                nanometer: { symbol: "nm", formula: "1 nm = 1e-9 m" },
                mile: { symbol: "mi", formula: "1 mi = 1609.34 m" },
                yard: { symbol: "yd", formula: "1 yd = 0.9144 m" },
                foot: { symbol: "ft", formula: "1 ft = 0.3048 m" },
                inch: { symbol: "in", formula: "1 in = 0.0254 m" }
            }
        },
        {
            unit_type: "mass",
            base_unit: "kilogram",
            symbol: "kg",
            measures: "mass of the International Prototype Kilogram (IPK)",
            measuring_instruments: ["balance scale", "spring scale", "load cell", "hydrostatic scale"],
            conversions: {
                gram: { symbol: "g", formula: "1 g = 0.001 kg" },
                milligram: { symbol: "mg", formula: "1 mg = 1e-6 kg" },
                microgram: { symbol: "μg", formula: "1 μg = 1e-9 kg" },
                tonne: { symbol: "t", formula: "1 t = 1000 kg" },
                pound: { symbol: "lb", formula: "1 lb = 0.453592 kg" },
                ounce: { symbol: "oz", formula: "1 oz = 0.0283495 kg" }
            }
        },
        {
            unit_type: "time",
            base_unit: "second",
            symbol: "s",
            measures: "duration of 9,192,631,770 periods of radiation of cesium-133 atom",
            measuring_instruments: ["stopwatch", "atomic clock", "sundial", "pendulum clock", "quartz clock"],
            conversions: {
                minute: { symbol: "min", formula: "1 min = 60 s" },
                hour: { symbol: "h", formula: "1 h = 3600 s" },
                day: { symbol: "d", formula: "1 d = 86400 s" },
                millisecond: { symbol: "ms", formula: "1 ms = 1e-3 s" },
                microsecond: { symbol: "μs", formula: "1 μs = 1e-6 s" },
                nanosecond: { symbol: "ns", formula: "1 ns = 1e-9 s" }
            }
        }
    ],
    derived_units: [
        {
            unit_type: "speed",
            unit: "meter per second",
            symbol: "m/s",
            measures: "rate of change of position",
            measuring_instruments: ["speedometer", "radar gun", "GPS"],
            base_formula: "speed = distance / time",
            conversions: {
                kilometers_per_hour: { symbol: "km/h", formula: "1 km/h = 0.277778 m/s" },
                miles_per_hour: { symbol: "mph", formula: "1 mph = 0.44704 m/s" },
                knot: { symbol: "kn", formula: "1 kn = 0.514444 m/s" }
            }
        },
        {
            unit_type: "force",
            unit: "newton",
            symbol: "N",
            measures: "interaction that causes acceleration",
            measuring_instruments: ["force gauge", "dynamometer"],
            base_formula: "force = mass × acceleration",
            conversions: {
                kilopond: { symbol: "kp", formula: "1 kp ≈ 9.80665 N" },
                dyne: { symbol: "dyn", formula: "1 dyn = 1e-5 N" }
            }
        },
        {
            unit_type: "energy",
            unit: "joule",
            symbol: "J",
            measures: "work done or heat transferred",
            measuring_instruments: ["calorimeter", "wattmeter"],
            base_formula: "energy = force × distance",
            conversions: {
                kilowatt_hour: { symbol: "kWh", formula: "1 kWh = 3.6e6 J" },
                calorie: { symbol: "cal", formula: "1 cal = 4.184 J" },
                electronvolt: { symbol: "eV", formula: "1 eV = 1.60219e-19 J" }
            }
        }
    ]
};

