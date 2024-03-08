from PIL import Image
import os

def create_multipage_pdf(folder_path, grid_size, image_size, output_path, margin=10):
    files = [f for f in os.listdir(folder_path) if f.endswith('.jpg')]
    images_per_page = grid_size[0] * grid_size[1]
    total_pages = len(files) // images_per_page + (1 if len(files) % images_per_page > 0 else 0)
    
    all_images = [Image.open(os.path.join(folder_path, f)).resize((image_size, image_size)) for f in files]
    grids = []
    
    page_width = image_size * grid_size[0] + margin * (grid_size[0] + 1)
    page_height = image_size * grid_size[1] + margin * (grid_size[1] + 1)
    
    for page in range(total_pages):
        grid = Image.new('RGB', (page_width, page_height), "white")
        start_index = page * images_per_page
        page_images = all_images[start_index:start_index + images_per_page]
        
        i = 0
        for y in range(grid_size[1]):
            for x in range(grid_size[0]):
                if i < len(page_images):
                    grid.paste(page_images[i], (x * (image_size + margin) + margin, y * (image_size + margin) + margin))
                    i += 1
                else:
                    break
        
        grids.append(grid)
    
    grids[0].save(output_path, "PDF", save_all=True, append_images=grids[1:])

# Hardcoded parameters
folder_path = "promo_codes"  # Update this path to where your QR codes are stored
grid_width = 8  # How many QR codes per row
grid_height = 10  # How many QR codes per column
image_size = 100  # Resize QR codes to 100x100 pixels
margin = 10  # Margin around each image and page border
output_path = "printables.pdf"  # Update this to where you want to save the PDF

# Call the function with hardcoded parameters
create_multipage_pdf(folder_path, (grid_width, grid_height), image_size, output_path, margin)
print(f"Multi-page PDF created at {output_path} with margins")
