import pandas as pd
import json
import sys

# Read Excel file
file_path = "KH-33_Requirement-Outline-v2 (2).xlsx"

try:
    # Read all sheets
    excel_file = pd.ExcelFile(file_path)
    
    # Save all sheets to JSON files
    all_data = {}
    
    for sheet_name in excel_file.sheet_names:
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        # Convert to dictionary
        sheet_data = {
            'columns': list(df.columns),
            'data': df.fillna('').to_dict('records')
        }
        
        all_data[sheet_name] = sheet_data
        
        # Save individual sheet
        output_file = f"sheet_{sheet_name.replace(' ', '_')}.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(sheet_data, f, ensure_ascii=False, indent=2)
    
    # Save combined data
    with open('excel_data.json', 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully read {len(excel_file.sheet_names)} sheets")
    print(f"Sheets: {excel_file.sheet_names}")
    print("Data saved to excel_data.json")
        
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    import traceback
    traceback.print_exc()

