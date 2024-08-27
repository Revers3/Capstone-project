import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Discount } from '../../service/Auth.Model';
import { MatTableDataSource } from '@angular/material/table';
import { DiscountService } from '../../service/Discount.Service';
import { userToken } from '../../login/login.comp';
import { UserService } from '../../service/User.Service';

@Component({
  selector: 'app-admin.discount',
  templateUrl: './admin.discount.component.html',
  styleUrl: './admin.discount.component.css'
})
export class AdminDiscountComponent {
  constructor(private router: Router, private disSer: DiscountService, private userService: UserService) { }
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


  //empty discount that stores new discounts
  //empty product that will only have an id, and then will send a get for that id
  //then will add that product to it
  newDis: Discount = { id: 0, discount: .0, product: {id: 0, name: '', category: '', price: 0 , stock: 0, image: ''}};
  
  disToEdit: Discount | null = null;
  isFormVisible: boolean = false;

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  displayedColumns: string[] = ['id', 'discount', 'productId', 'actions'];

  dataSource = new MatTableDataSource<Discount>();

  ngOnInit(): void {
    this.disSer.getAllDiscounts().subscribe(
      (data: Discount[]) => 
      {
        console.log('Fetched data:', data);
        this.dataSource.data = data;

        // Set custom filter predicate
        this.dataSource.filterPredicate = (data: Discount, filter: string) => {
        const filterValue = filter.trim().toLowerCase();
        // Filter based on product id only
        return data.product && data.product.id !== undefined 
        ? data.product.id.toString().includes(filterValue) 
          : false; // If product or id is undefined, return false
      };
        
      },

      error => console.error('Error fetching product data', error)
    )
  }

  //functions similarly to user and product
  //will run create if edit object is null, otherwise will run edit
  addDiscount() {
    if(this.newDis.id && this.newDis.discount && this.newDis.product.id)
    {
      if(this.disToEdit) {
        //update existing discount
        this.disSer.updateDiscount(this.newDis).subscribe(updatedDiscount => {
          const index = this.dataSource.data.findIndex(discount => discount.id === updatedDiscount.id);
          if(index !== -1) {
            this.dataSource.data[index] = updatedDiscount;
            this.dataSource.data = [...this.dataSource.data];
          }
          this.disToEdit = null;
        });
        //hiding the form
        this.isFormVisible = false;
        //clearing the form
        this.newDis = { id: 0, discount: .0, product: {id: 0, name: '', category: '', price: 0 , stock: 0, image: ''}};
      } else 
      {
        this.disSer.createDiscount(this.newDis).subscribe(newDis => {
          this.dataSource.data = [...this.dataSource.data, newDis];
        },
          (error) => {
            console.log('error making new discount', error);
            alert('Discount Must be for valid product. Check the id and try again');
          });
        //hiding the form
        this.isFormVisible = false;
        //clearing the form
        this.newDis = { id: 0, discount: .0, product: {id: 0, name: '', category: '', price: 0 , stock: 0, image: ''}};
      } 
      
    }else {
      alert('All fields are required');
    }
  }
  deleteDiscount(id: number, dis: Discount){
    if(confirm(`are you sure you want to delete discount ${dis.id}?`)) {
      this.disSer.deleteDiscount(id).subscribe(
        (error) => {
          console.log('Error', error);
        }
      )
    
    }
    this.dataSource.data = this.dataSource.data = this.dataSource.data.filter(u => u.id !== dis.id);
  }

  editDiscount(dis: Discount) {
    this.newDis = {...dis};
    this.disToEdit = dis;
    this.isFormVisible = true;
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
