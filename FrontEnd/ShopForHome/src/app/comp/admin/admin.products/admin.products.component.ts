import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../service/Auth.Model';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../service/Product.Service';
import { AwsS3Service } from '../../service/Aws.Service';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { userToken } from '../../login/login.comp';
import { UserService } from '../../service/User.Service';

@Component({
  selector: 'app-admin.products',
  templateUrl: './admin.products.component.html',
  styleUrl: './admin.products.component.css'
})
export class AdminProductsComponent {
  newProd: Product = { id: 0, name: '', category: '', price: 0, stock: 0, image: '' };

  prodToEdit: Product | null = null;

  selectedFile: File | null = null;
  imageUrl: string | null = null;

  isFormVisible: boolean = false;
  displayedColumns: string[] = ['id', 'image', 'name', 'category', 'price', 'stock', 'actions'];

  constructor(private router: Router, private prodService: ProductService, private awsSer: AwsS3Service, private userService: UserService) {}
//need to update these every time we use them
  goToHome()
  {
    this.router.navigate(['/admin']);
  }

  goToUsers()
  {
    this.router.navigate(['/adminUser']);
  }

  logout()
  {
    localStorage.removeItem(userToken);
    this.userService.deleteToken();
    this.router.navigate(['/']);
  }

  goToDiscounts()
  {
    this.router.navigate(['/adminDis']);
  }

  goToReport()
  {
    this.router.navigate(['/adminRep']);
  }

  goToProducts()
  {
    this.router.navigate(['/adminProd']);
  }
  goToOrders()
  {
    this.router.navigate(['/adminOrd']);
  }


  

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  

  dataSource = new MatTableDataSource<Product>();
  ngOnInit(): void {
    this.loadProds();
  }
  
  

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      try {
        await this.uploadFile(file);
        //alert('File uploaded successfully!');
        //set image in object to the link
        // Construct the image URL
        const imageUrl = this.getImageUrl(file.name);
        console.log(imageUrl);
      
      // Set image in object to the link
      this.newProd.image = imageUrl;

      } catch (error) {
        console.error('Upload failed:', error);
        alert('File upload failed.');
      }
    }
  }

   async uploadFile(file: File): Promise<void> {
    const s3Client = this.awsSer.getS3Client();
    const command = new PutObjectCommand({
      Bucket: 'shopforhomebucket',
      Key: file.name,
      Body: file,
      ContentType: file.type,
    });

    await s3Client.send(command);
  }



  getImageUrl(fileName: string): string {
    // Construct the URL
    const bucketName = 'shopforhomebucket';
    const region = 'us-east-2';
    return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
  }


  getImage(url: string) {
    console.log(url);
    return this.awsSer.getImage(url);
  }



  loadProds()
  {
    this.prodService.getAllProducts().subscribe(
      (data: Product[]) => 
      {
        console.log('Fetched data:', data);
        this.dataSource.data = data;
      },
      
      error => console.error('Error fetching product data', error)
    );
  }

  addProd() {
    if (this.newProd.id && this.newProd.name && this.newProd.category && this.newProd.price && this.newProd.stock) {
      //forcing only specific categories to be created
      if(this.newProd.category === 'bedroom' || this.newProd.category === 'kitchen' || this.newProd.category === 'furniture' || this.newProd.category === 'bath' || this.newProd.category === 'outdoor')
      {
        if (this.prodToEdit) {
          // Update existing product
          this.prodService.updateProduct(this.newProd).subscribe(updatedProd => {
            const index = this.dataSource.data.findIndex(prod => prod.id === updatedProd.id);
            if (index !== -1) {
              this.dataSource.data[index] = updatedProd;
              this.dataSource.data = [...this.dataSource.data]; // Trigger change detection
            }
            this.prodToEdit = null; // Clear the product being edited
          });
        } else {
          // Add new product
          this.prodService.createProduct(this.newProd).subscribe(newprod => {
            this.dataSource.data = [...this.dataSource.data, newprod];
            this.loadProds();
          });
        }
        // Clear form
        this.newProd = { id: 0, name: '', category: '', price: 0, stock: 0, image: '' };
        this.isFormVisible = false; // Hide form after submission
      } else {
        alert('Invalid Category. Must be bedroom, kitchen, bath, furniture, or outdoor');
      }
      
    } else {
      alert('All fields are required');
    }
    
  }

  editProd(prod: Product) {
    this.newProd = { ...prod }; // Pre-fill form with user data
    this.prodToEdit = prod;
    this.isFormVisible = true; // Show form if hidden
    //need to run update prod
    this.prodService.updateProduct(this.prodToEdit).subscribe(
      (data) => {
        console.log(data);
        this.loadProds();
      },
      (error) => {
        console.log('Error updating product', error);
      }
    );
    
  }

  deleteProd(prod: Product, id: number) {
    if (confirm(`Are you sure you want to delete product ${prod.name}?`)) {
      this.prodService.deleteProduct(id).subscribe(
        (error) => {
          console.log('Error', error);
        }
      )
    }
    this.dataSource.data = this.dataSource.data.filter(u => u.id !== prod.id);
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
