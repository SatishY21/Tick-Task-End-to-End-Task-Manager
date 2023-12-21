#include<stdio.h>
#include<stdlib.h>
#include<malloc.h>
struct node
{
	int usn;
	char nm[10];
	char prgm[10];
	int sem;
	int mno;
	struct node *link;

};typedef struct node *NODE;
//function to insert at beginning
NODE insfront(NODE first)
{
	NODE newnode;
	newnode=(NODE)malloc(sizeof (struct node));
	printf("Enter the usn name program semester mobile no. of students");
	//scanf("%d %s %s %d %d ",&newnode -> usn, newnode -> nm, newnode -> prgm, &newnode -> sem, &newnode -> mno);
	scanf("%d",&newnode->usn);
	scanf("%s",newnode->nm);
	scanf("%s",newnode->prgm);
	scanf("%d",&newnode->sem);
	scanf("%d",&newnode->mno);
	
	
	
	newnode->link=first;
	first=newnode;
	return first;
}
//function to insert at the end
NODE insert(NODE first)
{
	NODE newnode,temp;
	newnode=(NODE)malloc(sizeof(struct node));
	printf("Enter the usn name program semester mobile no. of students");
	//scanf("%d %s %s %d %d ",&newnode->usn, &newnode->nm, &newnode->prgm, &newnode->sem, &newnode->mno);
	scanf("%d",&newnode->usn);
	scanf("%s",newnode->nm);
	scanf("%s",newnode->prgm);
	scanf("%d",&newnode->sem);
	scanf("%d",&newnode->mno);
   	newnode->link=NULL;
   	temp=first;
   	while(temp->link!=NULL)
   	temp=temp->link;
   	temp->link=newnode;
   	return first;
}
//fun delete from beg
NODE defront(NODE first)
{
	{
		NODE temp;
		if(first==NULL)
		printf("LIst is empty");
		else
		{
			temp=first;
			first=first->link;
			free(temp);
		}
		return first;
	}
}
//delete at end 
NODE delend(NODE first)
{
	NODE prev,pres;
	if(first==NULL)
	printf("List is empty\n");
	return first;
	if(first->link==NULL)
	{
		pres=first;
		first=NULL;
		free(pres);
		return first;
	}
	printf("The usn name pgm sem mobile no. of students");
	pres=first;
	while(pres->link!=NULL)
	{
		pres=prev;
		pres=pres->link;
	}
	prev->link=NULL;
	free(pres);
	return first;
}

	


